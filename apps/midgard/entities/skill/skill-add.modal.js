const { MongoDb } = require('../../utils/mongo-connect')
const { SkillCustomId } = require('./skill.custom-id')
const { Skill } = require('./skill.model')

/**
 * @description On ajoute une compétence et la sauvegarde en base
 */
module.exports = {
  customId: SkillCustomId.skill_add_modal,
  execute: async (interaction) => {
    const name = interaction.fields.getTextInputValue(
      SkillCustomId.skill_add_name
    )
    const description = interaction.fields.getTextInputValue(
      SkillCustomId.skill_add_desc
    )
    await MongoDb()

    const skill = await Skill.create({ name, description })

    await interaction.reply({
      content: skill
        ? `la Compétence ${'`'}${skill.name}${'`'} a été ajoutée avec succès !`
        : "Erreur lors de l'ajout de la compétence",
    })
  },
}
