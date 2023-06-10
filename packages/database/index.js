const { NjordDb, MongoDb } = require('./db')
const { User } = require('./models/user.model')
const { DailyRanking, DailyContest } = require('./models/daily-contest.model')
const { Question } = require('./models/question.model')
const { Skill, UserSkill } = require('./models/skill.model')
const { Account } = require('./models/account.model')
const { Event } = require('./models/event.model')
const { eventTypes } = require('./data/event-type')

module.exports = {
  NjordDb,
  MongoDb,
  User,
  DailyRanking,
  DailyContest,
  Question,
  Skill,
  UserSkill,
  Event,
  Account,
  eventTypes,
}
