const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
  title: String,
  text: String,
  start: Date,
  end: Date,
  visibility: {
    type: String,
    enum: ['league', 'public'],
    default: 'league',
  },
  cancel: {
    type: Boolean,
    default: false,
  },
  recurrenceId: String,
  type: {
    type: String,
    enum: ['match', 'training', 'tournament', 'other'],
    default: 'match',
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'addresses',
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'attendees',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  versus: [String],
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sponsors',
  },
})

const Event = mongoose.model('events', EventSchema)
module.exports = { Event }
