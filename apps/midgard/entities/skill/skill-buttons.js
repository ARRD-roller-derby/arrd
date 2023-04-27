const { ButtonBuilder, ButtonStyle } = require('discord.js')
const { SkillCustomId } = require('./skill.custom-id')

const forAll = new ButtonBuilder()
  .setCustomId('primaryzs')
  .setLabel('Pour tous')
  .setStyle(ButtonStyle.Primary)

const skillDisplay = new ButtonBuilder()
  .setCustomId(SkillCustomId.skill_display)
  .setLabel('Afficher les compétences')
  .setStyle(ButtonStyle.Success)

const skillAdd = new ButtonBuilder()
  .setCustomId(SkillCustomId.skill_add)
  .setLabel('Ajouter un skill')
  .setStyle(ButtonStyle.Success)

const skillDelete = new ButtonBuilder()
  .setCustomId(SkillCustomId.skill_delete)
  .setLabel('Supprimer un skill')
  .setStyle(ButtonStyle.Danger)

module.exports = {
  forAll,
  skillDisplay,
  skillAdd,
  skillDelete,
}
