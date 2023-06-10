const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  identifier: String,
  token: String,
  expires: Date,
})

const Token = mongoose.model('verification_tokens', tokenSchema)
module.exports = { Token }
