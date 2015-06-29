'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Generic infringements companys may apply
var InfringementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
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

module.exports = mongoose.model('Infringement', InfringementSchema);