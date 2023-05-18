const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  sessionToken: 'string',
  userId: 'string',
  expires: 'date',
})

const Session = mongoose.model('sessions', sessionSchema)
module.export = { Session }
