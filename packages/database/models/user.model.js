const mongoose = require('mongoose')

const USER_SCHEMA_NAME = 'users'

const UserSchema = new mongoose.Schema({
  providerAccountId: 'string',
  wallet: 'number',
  name: 'string',
  lastName: 'string',
  derbyName: 'string',
  numRoster: 'number',
  numLicence: 'string',
  mst: 'number',
  msp: 'number',
  dailyContestAvgTime: 'number',
  dailyContestAvgAccuracy: 'number',
})

const User = mongoose.model(USER_SCHEMA_NAME, UserSchema)

module.exports = { User, UserSchema, USER_SCHEMA_NAME }
