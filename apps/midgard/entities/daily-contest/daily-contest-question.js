const dayjs = require('dayjs')
const { MongoDb, User, DailyContest} = require('database')
const { S3_BUCKET, S3_OLD_BUCKET } = require('../../utils/constants')
const { Question } = require('database/models/question.model')
const {
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require('discord.js')
const { DailyContestCustomId } = require('./daily-contest.custom-id')
const { shuffle } = require('../../helpers/shuffle')
const validator = require('validator')
const { Colors } = require('../../helpers/colors')
const { getReadTime } = require('../../helpers/get-read-time')
const { classementButton } = require('./daily-contest.buttons')
const { getResume } = require('../../helpers/get-resume')

async function dailyContestQuestion(interaction) {
  await MongoDb()
  const quiz = await DailyContest.findOne({
    day: dayjs().format('YYYY-MM-DD'),
  })

  //on traite les réponses
  if (interaction.values) {
    const values = interaction.values.map((value) => JSON.parse(value))
    const answer = {
      questionId: values[0].questionId,
      answerIds: values.map((value) => value.answerId),
    }
    const myRank = quiz.ranking.find(
      (rank) => rank.userId === interaction.user.id
    )

    if (myRank) {
      myRank.answers.push(answer)
      const myRankIndex = quiz.ranking.findIndex(
        (rank) => rank.userId === interaction.user.id
      )
      quiz.ranking.splice(myRankIndex, 1, myRank)
    }
  } else {
    const newRank = {
      userId: interaction.user.id,
      answers: [],
      start: new Date(),
    }
    quiz.ranking.push(newRank)
  }
  await quiz.save()
  const myRank = quiz.ranking.find(
    (rank) => rank.userId === interaction.user.id
  )

  //Fin du quizz, on calcul le score
  if (myRank && myRank?.answers.length >= 4) {
    myRank.end = new Date()

    const questions = await Question.find({
      _id: {
        $in: myRank.answers.map((answer) => answer.questionId),
      },
    })

    //calcul du temps pour chaque question
    const words = questions.reduce((acc, question) => {
      acc.push(...question.question.split(' '))

      question.answers.forEach((answer) => {
        acc.push(...answer.answer.split(' '))
      })

      return acc
    }, [])

    const readTime = getReadTime(words.join(' '))

    const countMyGoodAnswers = myRank.answers.reduce(
      (acc, { answerIds, questionId }) => {
        //search question
        const question = questions.find(
          (question) => question._id.toString() === questionId
        )

        //extract good answers
        const orignalGoodAnswers = question.answers.filter(
          (orignalAnswer) => orignalAnswer.type === 'good'
        )
        //count good answers
        const originalGoodAnswersCount = orignalGoodAnswers.length
        //count my good answers
        const countMyGoodAnswers = answerIds.filter((answerId) =>
          orignalGoodAnswers.find(
            (originalAnswer) => originalAnswer._id.toString() === answerId
          )
        ).length
        //if my good answers is equal to original good answers, add 1 to acc

        // save logs for each question
        if (countMyGoodAnswers === originalGoodAnswersCount) {
          question.good_answers_num = question.good_answers_num + 1
          return acc + 1
        } else {
          question.bad_answers_num = question.bad_answers_num + 1
        }
        question.save()
        return acc
      },
      0
    )

    const isExist = await User.count({ discordId: interaction.member.user.id })

    if (!isExist)
      await User.create({
        discordId: interaction.member.user.id,
        wallet: 500,
        name: interaction.member.user.username,
        mst: false,
        msp: false,
      })
    const me = await User.findOne({ discordId: interaction.user.id })
    let wallet = countMyGoodAnswers * 100

    if (countMyGoodAnswers === questions.length * 2) {
      wallet += 200
    }

    me.wallet += wallet

    myRank.percent = (countMyGoodAnswers / questions.length) * 100

    const diffSeconds = dayjs(myRank.end).diff(dayjs(myRank.start), 'second')
    //little score is good score
    myRank.score = countMyGoodAnswers * 3600 * readTime - diffSeconds
    myRank.speed = diffSeconds * readTime

    me.dailyContestAvgTime = me?.dailyContestAvgTime
      ? (me.dailyContestAvgTime + myRank.speed) / 2
      : myRank.speed
    me.dailyContestAvgAccuracy = me?.dailyContestAvgAccuracy
      ? (me.dailyContestAvgAccuracy + myRank.percent) / 2
      : myRank.percent
    me.lastDailyContest = new Date()

    const myRankIndex = quiz.ranking.findIndex(
      (rank) => rank.userId === interaction.user.id
    )

    quiz.ranking.splice(myRankIndex, 1, myRank)
    await me.save()
    await quiz.save()

    const fields = questions.map((question) => {
      const myAnswer = myRank.answers.find(
        (answer) => answer.questionId === question._id.toString()
      )
      if (!myAnswer) return
      const answers = question.answers.map((answer) => {
        const prefix = () => {
          //I can see the good answers and my answers with emojis
          if (answer.type === 'good') {
            return myAnswer?.answerIds.find(
              (answerId) => answerId === answer._id.toString()
            )
              ? '✅'
              : '🟢'
          } else {
            return myAnswer?.answerIds.find(
              (answerId) => answerId === answer._id.toString()
            )
              ? '❌'
              : '🔴'
          }
        }
        return (
          prefix() +
          ' ' +
          getResume(validator.unescape(answer.answer || ' '), 95)
        )
      })

      return {
        name: getResume(validator.unescape(question.question || ' '), 250),
        value: getResume(answers.join('\n'), 1020),
      }
    })

    const scoreEmbed = new EmbedBuilder()
      .setColor(myRank.percent >= 100 ? Colors.yellow : Colors.red)
      .setTitle('SCORE: ' + myRank.percent.toFixed(0) + '%')
      .setDescription(`tu as gagné ${wallet} Dr.`)
      .addFields(fields)
      .setTimestamp()

    const row = new ActionRowBuilder()

    row.addComponents(classementButton)

    await interaction.editReply({
      components: [row],
      embeds: [scoreEmbed],
    })
    return
  }

  const question = await Question.findById(
    shuffle(
      quiz.questions.filter(
        (id) => !myRank?.answers.find((a) => a.questionId === id)
      ),
      1
    )[0]
  )

  const questionEmbed = new EmbedBuilder()
    .setColor(Colors.green)
    .setTitle(`question ${myRank.answers.length + 1}`)
    .setDescription(validator.unescape(question.question))
    .setTimestamp()

  if (question?.img) {
    //change de bucket, l'ancien est deprecated
    const url = question?.img.replace(S3_OLD_BUCKET, S3_BUCKET)
    questionEmbed.setThumbnail(url)
    questionEmbed.setImage(url)
  }

  const select = new StringSelectMenuBuilder()
    .setCustomId(DailyContestCustomId.responses)
    .setPlaceholder('Sélectionne la ou les bonnes réponses')
    .addOptions(
      question.answers.map((answer) => {
        return new StringSelectMenuOptionBuilder()
          .setLabel(getResume(validator.unescape(answer.answer), 97))
          .setValue(
            JSON.stringify({ questionId: question._id, answerId: answer._id })
          )
      })
    )
    .setMinValues(1)
    .setMaxValues(question.answers.length)

  const row = new ActionRowBuilder().addComponents(select)

  return await interaction.editReply({
    components: [row],
    embeds: [questionEmbed],
  })
}

module.exports = { dailyContestQuestion }
