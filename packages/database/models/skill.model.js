const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  name: String,
  description: String,
  tags: [String],
})

const Skill = mongoose.model('Skill', SkillSchema)

const UserSkillSchema = new mongoose.Schema({
  skillId: String,
  userId: String,
  level: Number,
})

const UserSkill = mongoose.model('UserSkill', UserSkillSchema)
module.exports = { Skill, UserSkill }
