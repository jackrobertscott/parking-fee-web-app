'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Generic infringements companies may apply
var InfringementSchema = new Schema({
  payment: Number,
  info: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
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

module.exports = mongoose.model('Infringement', InfringementSchema);
