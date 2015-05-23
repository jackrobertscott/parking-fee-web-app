'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InspectionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Inspection', InspectionSchema);