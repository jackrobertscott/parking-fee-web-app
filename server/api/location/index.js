'use strict';

var express = require('express');
var controller = require('./location.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('company'), controller.create);
router.put('/:id', auth.hasRole('company'), controller.update);
router.patch('/:id', auth.hasRole('company'), controller.update);
router.delete('/:id', auth.hasRole('company'), controller.destroy);

// Added routes

router.get('/:id/company', auth.hasRole('company'), controller.getCompanyLocations);

module.exports = router;
