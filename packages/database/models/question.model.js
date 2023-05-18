const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  type: 'string',
  id: 'string',
  answer: 'string',
})

const QuestionSchema = new mongoose.Schema({
  question: 'string',
  answers: [answerSchema],
  active: 'boolean',
  img: 'string',
  description: 'string',
  difficulty: 'string',
  good_answers_num: 'number',
  bad_answers_num: 'number',
  updatedAt: 'date',
})

const Question = mongoose.model('question', QuestionSchema)
module.exports = { Question }
