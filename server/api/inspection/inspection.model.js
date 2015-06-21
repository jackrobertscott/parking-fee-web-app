'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InspectionSchema = new Schema({
  plate: { // inserted for vehicle plates not in system
    type: String,
    required: true
  },
  info: String,
  infringement: {
    type: Schema.Types.ObjectId,
    ref: 'Infringement'
  },
  paid: { // only nessessary if infringement is set
    type: Boolean,
    default: false
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
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

module.exports = mongoose.model('Inspection', InspectionSchema);