'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var IndependentSchema = new Schema({
  info: {
    type: String
  },
  authenticated: {
    type: Boolean,
    default: false
  },
  // financials: {},
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location',
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

module.exports = mongoose.model('Independent', IndependentSchema);
