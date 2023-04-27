const { default: mongoose } = require('mongoose')

const UserSchema = new mongoose.Schema({
  discordId: 'string',
  wallet: 'number',
  name: 'string',
  derbyName: 'string',
  numRoster: 'number',
  mst: 'boolean',
  msp: 'boolean',
  dailyContestAvgTime: 'number',
  dailyContestAvgAccuracy: 'number',
  roles: ['string'],
})

const User = mongoose.model('users', UserSchema)
module.exports = { User }
