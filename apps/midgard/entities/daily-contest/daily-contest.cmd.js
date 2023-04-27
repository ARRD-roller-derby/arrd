const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require('discord.js')
const { MongoDb, DailyContest,Question } = require('database')
const dayjs = require('dayjs')
const { shuffle } = require('../../helpers/shuffle')
const { questionDifficulty } = require('../../helpers/question-difficulty')
const { percent } = require('../../helpers/percent')
const { DailyContestCustomId } = require('./daily-contest.custom-id')
const {
  classementButton,
  classementDisabledButton,
} = require('./daily-contest.buttons')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily-contest')
    .setDescription(
      'Affronte les autres joueurs sur une compétition quotidienne.'
    ),
  async execute(interaction) {
    await MongoDb()

    const row = new ActionRowBuilder()

    const quiz = await DailyContest.findOne({
      day: dayjs().format('YYYY-MM-DD'),
    })

    if (!quiz) {
      const oldsQuizzes = await DailyContest.find({
        day: {
          $in: [
            dayjs().subtract(4, 'day').format('YYYY-MM-DD'),
            dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
            dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
            dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
          ],
        },
        questions: { $exists: true, $not: { $size: 0 } },
      }).select('questions')

      const oldsQuestions = oldsQuizzes.reduce((current, state) => {
        current.push(...state.questions)
        return current
      }, [])

      const questions = await Question.find({
        active: true,
        _id: { $not: { $in: oldsQuestions } },
      }).select('_id bad_answers_num good_answers_num')

      const shuffleQuestions = shuffle(
        questions.map((question) => question._id),
        4
      )

      const difficulties = questions.filter((question) =>
        shuffleQuestions.includes(question._id)
      )

      const questionsNum = difficulties.reduce(
        (current, state) => {
          current.bad += state.bad_answers_num
          current.good += state.good_answers_num
          return current
        },
        { bad: 0, good: 0 }
      )

      await DailyContest.create({
        difficulty: questionDifficulty(
          percent(questionsNum.good, questionsNum.good + questionsNum.bad)
        ),
        questions: shuffleQuestions,
        day: dayjs().format('YYYY-MM-DD'),
      })
    }

    const existQuiz = await DailyContest.findOne({
      day: dayjs().format('YYYY-MM-DD'),
    })

    const iHavePlayed = existQuiz.ranking.find(
      (r) => r.userId === interaction.user.id
    )

    row.addComponents(
      existQuiz.ranking.length === 0
        ? classementDisabledButton
        : classementButton
    )

    if (iHavePlayed?.end) {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(DailyContestCustomId.playButton)
          .setLabel("Tu as déjà joué aujourd'hui")
          .setStyle(ButtonStyle.Danger)
          .setDisabled(true)
      )
    } else {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(DailyContestCustomId.playButton)
          .setLabel(`Jouer (${existQuiz.difficulty})`)
          .setStyle(ButtonStyle.Success)
      )
    }

    await interaction.reply({
      content: `Compétition quotidienne`,
      components: row.components.length > 0 ? [row] : undefined,
      ephemeral: true,
    })
  },
}
