const { ActionRowBuilder, EmbedBuilder } = require('discord.js')
const { SkillCustomId } = require('./skill.custom-id')
const { MongoDb, Skill } = require('database')
const { getUserRoles } = require('../../helpers/get-user-roles')
const {
  skillDisplay,
  skillDelete,
  skillAdd,
  forAll,
} = require('./skill-buttons')
const { getResume } = require('../../helpers/get-resume')

/**
 * @description On ouvre une modale pour ajouter une compétence
 */
module.exports = {
  customId: SkillCustomId.skill_display,
  execute: async (interaction) => {
    await interaction.deferUpdate()
    await MongoDb()
    //TODO passe un paramètre pour la pagination
    const skills = await Skill.find().skip(0).limit(25).sort({ name: 1 })

    const roles = getUserRoles(interaction)
    const row = new ActionRowBuilder()

    row.addComponents(forAll)

    if (roles.coach) {
      row.addComponents(skillDisplay)
      row.addComponents(skillDelete)
      row.addComponents(skillAdd)
    }

    //créé une pagination pour afficher les compétences par 25.
    const skillListEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Liste des compétences')
      .setDescription(
        `${skills.length} compétences trouvée${skills.length > 1 ? 's' : ''}`
      )
      .addFields(
        skills.map((skill) => ({
          name: skill.name,
          value: getResume(skill.description),
        }))
      )
      .setTimestamp()

    await interaction.editReply({
      ephemeral: true,
      components: row.components.length > 0 ? [row] : undefined,
      embeds: [skillListEmbed],
    })
  },
}
