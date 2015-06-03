'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InspectionSchema = new Schema({
  info: String,
  plate: String, // inserted for vehicle plates not in system
  infringement: {
    type: Schema.Types.ObjectId,
    ref: 'Infringement'
  },
  paid: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('Inspection', InspectionSchema);
