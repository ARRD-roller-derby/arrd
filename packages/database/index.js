const { NjordDb,MongoDb } = require('./db')
const { User } = require('./models/user.model')
const { DailyRanking, DailyContest } = require('./models/daily-contest.model')
const { Question } = require('./models/question.model')
const { Skill, UserSkill } = require('./models/skill.model')
const { Event} = require('./models/event.model')

module.exports = { NjordDb ,MongoDb, User, DailyRanking, DailyContest,Question, Skill, UserSkill, Event }
