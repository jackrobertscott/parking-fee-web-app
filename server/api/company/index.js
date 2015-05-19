'use strict';

var express = require('express');
var controller = require('./company.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('company'), controller.index);
router.get('/:id', auth.hasRole('company'), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.hasRole('company'), controller.update);
router.patch('/:id', auth.hasRole('company'), controller.update);
router.delete('/:id', auth.hasRole('company'), controller.destroy);

// Added routes

router.get('/:id/members', auth.hasRole('company'), controller.getMembers);
router.get('/:id/locations', auth.hasRole('company'), controller.getCompanyLocations);

module.exports = router;
