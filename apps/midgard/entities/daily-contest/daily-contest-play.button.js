const { dailyContestQuestion } = require('./daily-contest-question')
const { DailyContestCustomId } = require('./daily-contest.custom-id')

module.exports = {
  customId: DailyContestCustomId.playButton,
  execute: async (interaction) => {
    await interaction.deferUpdate()
    await dailyContestQuestion(interaction)
  },
}
