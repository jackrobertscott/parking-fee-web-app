'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: String,
  info: String,
  email: String,
  phone: Number,
  active: Boolean,
  authenticated: Boolean,
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  inspectors: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

CompanySchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');

module.exports = mongoose.model('Company', CompanySchema);
