const { ButtonBuilder } = require('@discordjs/builders')
const { DailyContestCustomId } = require('./daily-contest.custom-id')
const { ButtonStyle } = require('discord.js')

const classementButton = new ButtonBuilder()
  .setCustomId(DailyContestCustomId.rankButton)
  .setLabel('Voir le classement')
  .setStyle(ButtonStyle.Primary)

const classementDisabledButton = new ButtonBuilder()
  .setCustomId(DailyContestCustomId.rankButton)
  .setLabel('Voir le classement')
  .setStyle(ButtonStyle.Primary)
  .setDisabled(true)

module.exports = { classementButton, classementDisabledButton }
