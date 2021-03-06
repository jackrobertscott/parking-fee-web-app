'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SessionSchema = new Schema({
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
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
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
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
