'use strict';

var _ = require('lodash');
var User = require('./user.model');
var Company = require('../company/company.model');
var Vehicle = require('../vehicle/vehicle.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) {
      return handleError(res, err);
    }
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session, {
      expiresInMinutes: 60 * 5
    });
    res.json({
      token: token
    });
  });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;
  User.findById(userId, '-salt -hashedPassword', function(err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      return handleError(res, err);
    }
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
  User.findById(userId, function(err, user) {
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
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
      _id: userId
    },
    '-salt -hashedPassword',
    function(err, user) { // don't ever give out the password or salt
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

// Added functions

/**
 * PUT: Safely update the user
 */
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.body.salt) {
    delete req.body.salt;
  }
  if (req.body.hashedPassword) {
    delete req.body.hashedPassword;
  }
  User.findById(req.params.id, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404);
    }
    var updated = _.merge(user, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, user);
    });
  });
};

/**
 * GET: company members
 */
exports.getCompanyMembers = function(req, res) {
  Company.findById(req.params.id, function(err, company) {
    if (err) {
      return handleError(res, err);
    }
    if (!company) {
      return res.send(404);
    }
    User.find({
      _id: {
        $in: company.members
      }
    }, function(err, users) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(users);
    });
  });
};

/**
 * Add user to company members
 */
exports.addCompanyMember = function(req, res) {
  var companyId = req.body.company;
  var role = req.body.role;
  if (!companyId || !role || config.userRoles.indexOf(role) === -1) {
    return res.send(404);
  }
  User.findById(req.params.id, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404);
    }
    Company.findById(companyId, function(err, company) {
      if (err) {
        return handleError(res, err);
      }
      if (!company) {
        return res.send(404);
      }
      // update user
      user.company = companyId;
      user.role = role;
      user.save(function(err) {
        if (err) {
          return handleError(res, err);
        }
        // and user to company members
        company.members.push(user._id);
        company.markModified('members');
        company.save(function(err) {
          if (err) {
            return handleError(res, err);
          }
          return res.json(200, user);
        });
      });
    });
  });
};

/**
 * Remove user from company members
 */
exports.removeCompanyMember = function(req, res) {
  User.findById(req.params.id, '-salt -hashedPassword', function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (!user) {
      return res.send(404);
    }
    Company.findById(user.company, function(err, company) {
      if (err) {
        return handleError(res, err);
      }
      if (!company) {
        return res.send(404);
      }
      // update user
      user.company = null;
      user.role = 'user';
      user.save(function(err) {
        if (err) {
          return handleError(res, err);
        }
        // remove user from company members
        _.remove(company.members, user._id);
        company.markModified('members');
        company.save(function(err) {
          if (err) {
            return handleError(res, err);
          }
          return res.json(200, user);
        });
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function validationError(res, err) {
  return res.json(422, err);
}