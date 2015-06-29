'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  abn: {
    type: Number,
    required: true
  },
  authenticated: {
    type: Boolean,
    default: false
  },
  // financials: {},
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
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

CompanySchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

module.exports = mongoose.model('Company', CompanySchema);
