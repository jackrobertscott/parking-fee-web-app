'use strict';

var _ = require('lodash');
var Independent = require('./independent.model');
var User = require('../user/user.model');
var config = require('../../config/environment');

// Get list of independents
exports.index = function(req, res) {
  Independent.find(function(err, independents) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, independents);
  });
};

// Get a single independent
exports.show = function(req, res) {
  Independent.findById(req.params.id, function(err, independent) {
    if (err) {
      return handleError(res, err);
    }
    if (!independent) {
      return res.send(404);
    }
    return res.json(independent);
  });
};

// Creates a new independent in the DB.
exports.create = function(req, res) {
  Independent.create(req.body, function(err, independent) {
    if (err) {
      return handleError(res, err);
    }
    User.findById(independent._creator, function(err, user) {
      if (err) {
        return handleError(res, err);
      }
      if (!user) {
        return res.send(401);
      } // check
      user.independent = independent._id;
      if (config.userRoles.indexOf('independent') > config.userRoles.indexOf(user.role)) {
        user.role = 'independent';
      }
      user.save(function(err) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(201, independent);
      });
    });
  });
};

// Updates an existing independent in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Independent.findById(req.params.id, function(err, independent) {
    if (err) {
      return handleError(res, err);
    }
    if (!independent) {
      return res.send(404);
    }
    var updated = _.merge(independent, req.body);
    updated.markModified('locations');
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, independent);
    });
  });
};

// Deletes a independent from the DB.
exports.destroy = function(req, res) {
  Independent.findById(req.params.id, function(err, independent) {
    if (err) {
      return handleError(res, err);
    }
    if (!independent) {
      return res.send(404);
    }
    independent.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
