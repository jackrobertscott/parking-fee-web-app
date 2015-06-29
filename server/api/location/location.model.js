'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  rate: { // Hourly parking rate in cents
    type: Number,
    required: true
  },
  start: { // Charging start time (seconds into day)
    type: Date,
    required: true
  },
  end: { // Charing end time (seconds into day)
    type: Date,
    required: true
  },
  lots: {
    type: Number
  },
  info: {
    type: String
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Location', LocationSchema);
