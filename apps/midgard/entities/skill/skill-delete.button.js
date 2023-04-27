const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const { SkillCustomId } = require('./skill.custom-id')
const { MongoDb, Skill } = require('database')
const { getResume } = require('../../helpers/get-resume')

/**
 * @description On ouvre une modale pour ajouter une compétence
 */
module.exports = {
  customId: SkillCustomId.skill_delete,
  execute: async (interaction) => {
    //récupère les compétences depuis la base de données
    await MongoDb()
    const skills = await Skill.find().sort({ name: 1 })

    //créé une liste de compétences pour le select
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Rien Selectionné')
        .addOptions(
          skills.map((skill) => ({
            label: skill.name,
            description: getResume(skill.description),
            value: skill._id.toString(),
          }))
        )
    )

    //envoie le message
    await interaction.reply({
      content: `Supprimer une compétence :`,
      components: [row],
    })
  },
}
