/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Company = require('../api/company/company.model');
var Independent = require('../api/independent/independent.model');
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
  }, function(err, testUser, inspectorUser, independentUser, companyUser, adminUser) {
    if (err) console.log(err);
    console.log('finished populating users');
    Independent.find({}).remove(function() {
      Independent.create({
        authenticated: true,
        _creator: independentUser._id
      }, function(err, testIndependent) {
          if (err) console.log(err);
          independentUser.independent = testIndependent._id;
          independentUser.save();
      });
    });
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
