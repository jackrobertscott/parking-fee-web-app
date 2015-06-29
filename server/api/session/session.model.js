'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SessionSchema = new Schema({
  start: { // Charging start time (seconds into day)
    type: Date,
    required: true
  },
  time: { // Time spent parking (seconds)
    type: Number,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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

module.exports = mongoose.model('Session', SessionSchema);
