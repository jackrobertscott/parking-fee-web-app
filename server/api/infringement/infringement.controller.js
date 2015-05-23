'use strict';

var _ = require('lodash');
var Infringement = require('./infringement.model');
var Company = require('../company/company.model');

// Get list of infringements
exports.index = function(req, res) {
  Infringement.find(function (err, infringements) {
    if(err) { return handleError(res, err); }
    return res.json(200, infringements);
  });
};

// Get a single infringement
exports.show = function(req, res) {
  Infringement.findById(req.params.id, function (err, infringement) {
    if(err) { return handleError(res, err); }
    if(!infringement) { return res.send(404); }
    return res.json(infringement);
  });
};

// Creates a new infringement in the DB.
exports.create = function(req, res) {
  Infringement.create(req.body, function(err, infringement) {
    if(err) { return handleError(res, err); }
    return res.json(201, infringement);
  });
};

// Updates an existing infringement in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Infringement.findById(req.params.id, function (err, infringement) {
    if (err) { return handleError(res, err); }
    if(!infringement) { return res.send(404); }
    var updated = _.merge(infringement, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, infringement);
    });
  });
};

// Deletes a infringement from the DB.
exports.destroy = function(req, res) {
  Infringement.findById(req.params.id, function (err, infringement) {
    if(err) { return handleError(res, err); }
    if(!infringement) { return res.send(404); }
    infringement.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get a single infringement
exports.getFewCompany = function(req, res) {
  Infringement.find({ company: req.params.id }, function (err, infringements) {
    if(err) { return handleError(res, err); }
    return res.json(infringements);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
