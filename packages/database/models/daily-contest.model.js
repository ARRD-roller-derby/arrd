const { default: mongoose } = require('mongoose')

const DailyRankingSchema = new mongoose.Schema({
  userId: 'string',
  start: 'date',
  end: 'date',
  percent: 'number',
  score: 'number',
  answers: [
    {
      questionId: 'string',
      answerIds: ['string'],
    },
  ],
})

const DailyRanking = mongoose.model('dailyRankings', DailyRankingSchema)

const DailyContestSchema = new mongoose.Schema({
  difficulty: 'string',
  day: {
    type: 'string',
    unique: true,
  },
  questions: ['string'],
  ranking: [DailyRankingSchema],
  updatedAt: 'date',
})

const DailyContest = mongoose.model('dailyContests', DailyContestSchema)

module.exports = { DailyRanking, DailyContest }
