/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Company = require('../api/company/company.model');
var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'User Role',
    email: 'test@test.com',
    password: 'password'
  }, {
    provider: 'local',
    role: 'inspector',
    name: 'Inspector Role',
    email: 'inspector@inspector.com',
    password: 'password'
  }, {
    provider: 'local',
    role: 'independent',
    name: 'Independent Role',
    email: 'independent@independent.com',
    password: 'password'
  }, {
    provider: 'local',
    role: 'company',
    name: 'Company Role',
    email: 'company@company.com',
    password: 'password'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin Role',
    email: 'admin@admin.com',
    password: 'password'
  }, function(err, testUser, companyUser, inspectorUser, adminUser) {
    if (err) console.log(err);
    console.log('finished populating users');
    Company.find({}).remove(function() {
      Company.create({
        name: 'Test Company',
        email: 'test@company.com',
        phone: 3123553,
        abn: 3574513589,
        authenticated: true,
        members: [companyUser._id, inspectorUser._id],
        _creator: companyUser._id
      }, function(err, testCompany) {
        if (err) console.log(err);
        companyUser.company = testCompany._id;
        companyUser.save();
        inspectorUser.company = testCompany._id;
        inspectorUser.save();
      });
    });
  });
});
