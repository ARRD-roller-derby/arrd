const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js')
const { getUserRoles } = require('../../helpers/get-user-roles')
const { forAll, skillDisplay, skillAdd } = require('./skill-buttons')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skills')
    .setDescription('Gestion des compétences'),
  async execute(interaction) {
    const roles = getUserRoles(interaction)

    const row = new ActionRowBuilder()

    row.addComponents(forAll)

    if (roles.coach) {
      row.addComponents(skillDisplay)
      row.addComponents(skillAdd)
    }

    //TODO, si click sur update, on envoi en res un select avec les compétences, pareil pour delete.
    await interaction.reply({
      content: `Gestion des **compétences**.`,
      components: row.components.length > 0 ? [row] : undefined,
      ephemeral: true,
    })
  },
}
