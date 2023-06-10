const mongoose = require('mongoose')

const USER_SCHEMA_NAME = 'users'

const UserSchema = new mongoose.Schema({
  providerAccountId: String,
  wallet: Number,
  name: String,
  lastName: String,
  derbyName: String,
  numRoster: Number,
  numLicence: String,
  mst: Number,
  msp: Number,
  dailyContestAvgTime: Number,
  dailyContestAvgAccuracy: Number,
})

const User = mongoose.model(USER_SCHEMA_NAME, UserSchema)

module.exports = { User, UserSchema, USER_SCHEMA_NAME }
