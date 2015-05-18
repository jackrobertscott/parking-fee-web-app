'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: String,
  info: String,
  email: String,
  phone: String,
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
  authenticated: {
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

CompanySchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

module.exports = mongoose.model('Company', CompanySchema);
