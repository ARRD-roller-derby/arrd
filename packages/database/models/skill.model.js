const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  name: 'string',
  description: 'string',
  tags: ['string'],
})

const Skill = mongoose.model('Skill', SkillSchema)

const UserSkillSchema = new mongoose.Schema({
  skillId: 'string',
  userId: 'string',
  level: 'number',
})

const UserSkill = mongoose.model('UserSkill', UserSkillSchema)
module.exports = { Skill, UserSkill }
