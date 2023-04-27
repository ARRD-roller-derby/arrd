const dayjs = require('dayjs')
const { MongoDb, DailyContest } = require('database')
const { DailyContestCustomId } = require('./daily-contest.custom-id')
const { getMembers } = require('../../helpers/get_members')

module.exports = {
  customId: DailyContestCustomId.rankButton,
  execute: async (interaction, client) => {
    await interaction.deferUpdate()
    await MongoDb()

    const quiz = await DailyContest.findOne({
      day: dayjs().format('YYYY-MM-DD'),
    })

    if (!quiz)
      return interaction.editReply({
        content: "Personne n'a participé aujourd'hui",
        embeds: [],
      })

    const players = quiz.ranking.sort((a, b) => b.score - a.score)
    const members = await getMembers(client)
    const textArray = players.map((player, index) => {
      const member = members.find((member) => member.id === player.userId)
      return `**${index + 1}** __${member.username}__ *${player.percent}%* \n`
    })

    await interaction.editReply({
      content: textArray.join(''),
      embeds: [],
    })
  },
}
