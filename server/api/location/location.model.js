'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  suburb: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  post: {
    type: Number,
    required: true
  },
  rate: { // Hourly parking rate in cents
    type: Number,
    required: true
  },
  start: { // Park opening time
    type: Date,
    required: true
  },
  end: { // Park closing time
    type: Date,
    required: true
  },
  limit: { // Time max allowed to park (milliseconds)
    type: Number,
    required: true
  },
  lots: {
    type: Number,
    required: true
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
