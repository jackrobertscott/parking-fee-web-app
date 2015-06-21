'use strict';

var _ = require('lodash');
var Inspection = require('./inspection.model');
var User = require('../user/user.model');

// Get list of inspections
exports.index = function(req, res) {
  Inspection.find()
    .populate('infringement')
    .exec(function(err, inspections) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, inspections);
    });
};

// Get a single inspection
exports.show = function(req, res) {
  Inspection.findById(req.params.id)
    .populate('infringement')
    .exec(function(err, inspection) {
      if (err) {
        return handleError(res, err);
      }
      if (!inspection) {
        return res.send(404);
      }
      return res.json(inspection);
    });
};

// Creates a new inspection in the DB.
exports.create = function(req, res) {
  Inspection.create(req.body, function(err, inspection) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, inspection);
  });
};

// Updates an existing inspection in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Inspection.findById(req.params.id, function(err, inspection) {
    if (err) {
      return handleError(res, err);
    }
    if (!inspection) {
      return res.send(404);
    }
    var updated = _.merge(inspection, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, inspection);
    });
  });
};

// Deletes a inspection from the DB.
exports.destroy = function(req, res) {
  Inspection.findById(req.params.id, function(err, inspection) {
    if (err) {
      return handleError(res, err);
    }
    if (!inspection) {
      return res.send(404);
    }
    inspection.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

// Get list of infringing inspections for user
exports.getUserInfringed = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) {
      return res.send(404);
    }
    if (!user.vehicles || !user.vehicles.length) {
      return res.json(200, []); // no vehicles = no infringements
    }
    var plates = [];
    user.vehicles.forEach(function(vehicle) {
      plates.push(vehicle.plate);
    });
    Inspection.find({
        plate: {
          $in: plates
        },
        infringement: {
          $exists: true
        },
        paid: false
      })
      .populate('infringement')
      .exec(function(err, inspections) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(200, inspections);
      });
  });
};

// Get list of inspections for company
exports.getUserInfringed = function(req, res) {
  Inspection.find({
      company: req.params.id
    })
    .populate('infringement')
    .exec(function(err, inspections) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, inspections);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}