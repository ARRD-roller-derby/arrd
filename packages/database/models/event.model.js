const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  start: 'date',
  end: 'date',
  title: 'string',
  cancel: 'boolean',
  description: 'string',
  type: 'string',
  hourStart: 'string',
  hourEnd: 'string',
})

const Event = mongoose.model('events', EventSchema)
module.exports = { Event }
