'use strict';

var _ = require('lodash');
var Vehicle = require('./vehicle.model');
var User = require('../user/user.model');

// Get list of vehicles
exports.index = function(req, res) {
  Vehicle.find(function (err, vehicles) {
    if (err) { return handleError(res, err); }
    return res.json(200, vehicles);
  });
};

// Get a single vehicle
exports.show = function(req, res) {
  Vehicle.findById(req.params.id, function (err, vehicle) {
    if (err) { return handleError(res, err); }
    if (!vehicle) { return res.send(404); }
    return res.json(vehicle);
  });
};

// Creates a new vehicle in the DB.
exports.create = function(req, res) {
  Vehicle.create(req.body, function(err, vehicle) {
    if (err) { return handleError(res, err); }
    if (!vehicle) { return res.send(404); }
    User.findById(vehicle._creator, function(err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }
      user.vehicles.push(vehicle._id);
      user.save(function(err) {
        if (err) { return handleError(res, err); }
        return res.json(201, vehicle);
      });
    });
  });
};

// Updates an existing vehicle in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  Vehicle.findById(req.params.id, function (err, vehicle) {
    if (err) { return handleError(res, err); }
    if (!vehicle) { return res.send(404); }
    var updated = _.merge(vehicle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, vehicle);
    });
  });
};

// Deletes a vehicle from the DB.
exports.destroy = function(req, res) {
  Vehicle.findById(req.params.id, function (err, vehicle) {
    if (err) { return handleError(res, err); }
    if (!vehicle) { return res.send(404); }
    // Remove from user aswell
    User.findById(vehicle._creator, function (err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }
      user.vehicles.forEach(function(element, i, array) {
        if (element === vehicle._id) {
          array.splice(i, 1);
        }
      });
      user.save(function(err) {
        if (err) { return handleError(res, err); }
        vehicle.remove(function(err) {
          if (err) { return handleError(res, err); }
          return res.send(204);
        });
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
