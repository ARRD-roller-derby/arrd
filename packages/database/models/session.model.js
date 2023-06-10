const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  sessionToken: String,
  userId: String,
  expires: Date,
})

const Session = mongoose.model('sessions', sessionSchema)
module.export = { Session }
