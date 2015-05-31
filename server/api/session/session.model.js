'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SessionSchema = new Schema({
  start: Date,
  end: Date,
  payment: Number,
  info: String,
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
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

module.exports = mongoose.model('Session', SessionSchema);
