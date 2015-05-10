'use strict';

var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Associate a company to user
 */
exports.setCompany = function(req, res, next) {
  var userId = req.user._id;
  var companyId = String(req.body.company._id);

  User.findById(userId, function (err, user) {
    user.company = companyId;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Increase a users role to a higher role
 */
exports.promote = function(req, res, next) {
  var userId = req.user._id;
  var oldRole = req.user.role;
  var newRole = String(req.body.role);

  // Check if the given role exists
  if (config.userRoles.indexOf(newRole) === -1) {
    return res.send(403);
  }

  // Already have role higher then requested
  if (config.userRoles.indexOf(newRole) < config.userRoles.indexOf(oldRole)) {
    return res.send(200);
  }

  User.findById(userId, function (err, user) {
    user.role = newRole;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Decrease users role to lower role
 */
exports.demote = function(req, res, next) {
  var userId = req.user._id;
  var oldRole = req.user.role;
  var newRole = String(req.body.role);

  // Check if the given role exists
  if (config.userRoles.indexOf(newRole) === -1) {
    return res.send(403);
  }

  // Already have role lower then requested
  if (config.userRoles.indexOf(newRole) > config.userRoles.indexOf(oldRole)) {
    return res.send(200);
  }

  User.findById(userId, function (err, user) {
    user.role = newRole;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({_id: userId})
  .select('-salt -hashedPassword')
  .populate('company')
  .exec(function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
