'use strict';

var express = require('express');
var controller = require('./location.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('independent'), controller.create);
router.put('/:id', auth.hasRole('independent'), controller.update);
router.patch('/:id', auth.hasRole('independent'), controller.update);
router.delete('/:id', auth.hasRole('independent'), controller.destroy);

// Added routes

router.get('/:id/company', auth.hasRole('company'), controller.getCompanyLocations);
router.get('/:id/independent', auth.hasRole('independent'), controller.getIndependentLocations);

module.exports = router;
