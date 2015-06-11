'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
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
  lots: Number, // Optional: number of parking lots
  info: String,
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
