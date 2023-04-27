const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js')
const { SkillCustomId } = require('./skill.custom-id')

/**
 * @description On ouvre une modale pour ajouter une compétence
 */
module.exports = {
  customId: SkillCustomId.skill_add,
  execute: async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId(SkillCustomId.skill_add_modal)
      .setTitle('Ajouter une compétence')

    const nameInput = new TextInputBuilder()
      .setCustomId(SkillCustomId.skill_add_name)
      .setLabel('dénomination de la compétence')
      .setStyle(TextInputStyle.Short)

    const descInput = new TextInputBuilder()
      .setCustomId(SkillCustomId.skill_add_desc)
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph)

    const nameInputRow = new ActionRowBuilder().addComponents(nameInput)
    const descInputRow = new ActionRowBuilder().addComponents(descInput)

    modal.addComponents(nameInputRow, descInputRow)

    await interaction.showModal(modal)
  },
}
