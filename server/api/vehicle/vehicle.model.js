'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VehicleSchema = new Schema({
  plate: {
    type: String,
    required: true,
    unique: true
  },
  make: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  info: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
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

module.exports = mongoose.model('Vehicle', VehicleSchema);