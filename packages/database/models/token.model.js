const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  identifier: 'string',
  token: 'string',
  expires: 'date',
})

const Token = mongoose.model('verification_tokens', tokenSchema)
module.exports = { Token }
