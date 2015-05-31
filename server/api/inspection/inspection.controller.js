'use strict';

var _ = require('lodash');
var Inspection = require('./inspection.model');

// Get list of inspections
exports.index = function(req, res) {
  Inspection.find(function (err, inspections) {
    if(err) { return handleError(res, err); }
    return res.json(200, inspections);
  });
};

// Get a single inspection
exports.show = function(req, res) {
  Inspection.findById(req.params.id, function (err, inspection) {
    if(err) { return handleError(res, err); }
    if(!inspection) { return res.send(404); }
    return res.json(inspection);
  });
};

// Creates a new inspection in the DB.
exports.create = function(req, res) {
  Inspection.create(req.body, function(err, inspection) {
    if(err) { return handleError(res, err); }
    return res.json(201, inspection);
  });
};

// Updates an existing inspection in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Inspection.findById(req.params.id, function (err, inspection) {
    if (err) { return handleError(res, err); }
    if(!inspection) { return res.send(404); }
    var updated = _.merge(inspection, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, inspection);
    });
  });
};

// Deletes a inspection from the DB.
exports.destroy = function(req, res) {
  Inspection.findById(req.params.id, function (err, inspection) {
    if(err) { return handleError(res, err); }
    if(!inspection) { return res.send(404); }
    inspection.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}