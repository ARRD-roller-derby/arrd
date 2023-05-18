const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  expires_at: Date,
  refresh_token: String,
  token_type: String,
  userId: 'ObjectId',
  expires: Date,
})

const Account = mongoose.model('accounts', accountSchema)
module.exports = { Account }
