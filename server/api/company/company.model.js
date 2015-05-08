'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  authenticated: Boolean,
  contact: {
    email: String,
    phone: Number
  },
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

module.exports = mongoose.model('Company', CompanySchema);
