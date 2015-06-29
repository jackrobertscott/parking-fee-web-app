'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var IndependentSchema = new Schema({
  info: String,
  // financials: {},
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location',
    default: []
  }],
  authenticated: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('Independent', IndependentSchema);
