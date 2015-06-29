'use strict';

var _ = require('lodash');
var Location = require('./location.model');
var Company = require('../company/company.model');
var Independent = require('../independent/independent.model');

// Get list of locations
exports.index = function(req, res) {
  Location.find(function(err, locations) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, locations);
  });
};

// Get a single location
exports.show = function(req, res) {
  Location.findById(req.params.id, function(err, location) {
    if (err) {
      return handleError(res, err);
    }
    if (!location) {
      return res.send(404);
    }
    return res.json(location);
  });
};

// Creates a new location in the DB.
exports.create = function(req, res) {
  Location.create(req.body, function(err, location) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, location);
  });
};

// Updates an existing location in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Location.findById(req.params.id, function(err, location) {
    if (err) {
      return handleError(res, err);
    }
    if (!location) {
      return res.send(404);
    }
    var updated = _.merge(location, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, location);
    });
  });
};

// Deletes a location from the DB.
exports.destroy = function(req, res) {
  Location.findById(req.params.id, function(err, location) {
    if (err) {
      return handleError(res, err);
    }
    if (!location) {
      return res.send(404);
    }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

// Get a company's locations
exports.getCompanyLocations = function(req, res) {
  Company.findById(req.params.id, function(err, company) {
    if (err) {
      return handleError(res, err);
    }
    if (!company) {
      return res.send(404);
    }
    Location.find({
      _id: {
        $in: company.locations
      }
    }, function(err, locations) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(locations);
    });
  });
};

// Get a independent's locations
exports.getIndependentLocations = function(req, res) {
  Independent.findById(req.params.id, function(err, independent) {
    if (err) {
      return handleError(res, err);
    }
    if (!independent) {
      return res.send(404);
    }
    Location.find({
      _id: {
        $in: independent.locations
      }
    }, function(err, locations) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(locations);
    });
  });
};
