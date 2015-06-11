/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Company = require('../api/company/company.model');
var Location = require('../api/location/location.model');
var User = require('../api/user/user.model');
var Vehicle = require('../api/vehicle/vehicle.model');

Company.find({}).remove();
Location.find({}).remove();
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'Other User',
    email: 'other@other.com',
    password: 'other'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});
Vehicle.find({}).remove();