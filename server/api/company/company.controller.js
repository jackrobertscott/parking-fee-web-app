'use strict';

var _ = require('lodash');
var Company = require('./company.model');
var User = require('../user/user.model');
var Location = require('../location/location.model');
var config = require('../../config/environment');

// Get list of companies
exports.index = function(req, res) {
  Company.find(function (err, companies) {
    if (err) { return handleError(res, err); }
    return res.json(200, companies);
  });
};

// Get a single company
exports.show = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if (err) { return handleError(res, err); }
    if (!company) { return res.send(404); }
    return res.json(company);
  });
};

// Creates a new company in the DB.
exports.create = function(req, res) {
  Company.create(req.body, function(err, company) {
    if (err) { return handleError(res, err); }
    User.findById(company._creator, function(err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(401); } // check
      user.company = company._id;
      if (config.userRoles.indexOf('company') > config.userRoles.indexOf(user.role)) {
        user.role = 'company';
      }
      user.save(function(err) {
        if (err) { return handleError(res, err); }
        return res.json(201, company);
      });
    });
  });
};

// Updates an existing company in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  Company.findById(req.params.id, function (err, company) {
    if (err) { return handleError(res, err); }
    if (!company) { return res.send(404); }
    var updated = _.merge(company, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, company);
    });
  });
};

// Deletes a company from the DB.
exports.destroy = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if (err) { return handleError(res, err); }
    if (!company) { return res.send(404); } // check
    // Remove company in users aswell
    User.find({ company: company._id }, function (err, users) {
      if (err) { return handleError(res, err); }
      if (!users) { return res.send(404); } // check
      users.forEach(function(user, i, array) {
        user.company = null;
        if (config.userRoles.indexOf('admin') > config.userRoles.indexOf(user.role)) {
          user.role = 'user';
        }
        user.save(function(err) {
          if (err) { return handleError(res, err); }
        });
      });
    });
    Location.find({ company: company._id }, function (err, locations) {
      if (err) { return handleError(res, err); }
      if (locations && _.isArray(locations)) {
        locations.forEach(function(location, i, array) {
          location.remove(function(err) {
            if (err) { return handleError(res, err); }
          });
        });
      }
    });
    company.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
