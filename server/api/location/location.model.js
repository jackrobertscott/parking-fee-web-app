'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String,
  info: String,
  rate: Number, // Hourly parking rate in cents
  lots: Number, // Number of parking lots
  start: Date, // Charging start time (seconds into day)
  end: Date, // Charing end time (seconds into day)
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
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
