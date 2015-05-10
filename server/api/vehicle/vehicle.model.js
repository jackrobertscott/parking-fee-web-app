'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VehicleSchema = new Schema({
  plate: String,
  make: String,
  colour: String,
  type: String,
  info: String,
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
