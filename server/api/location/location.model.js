'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  info: String,
  rate: { // Hourly parking rate in cents
    type: Number,
    required: true
  },
  lots: Number, // Number of parking lots
  start: { // Charging start time (seconds into day)
    type: Date,
    required: true
  },
  end: { // Charing end time (seconds into day)
    type: Date,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
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
