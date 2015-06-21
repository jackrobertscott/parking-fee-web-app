'use strict';

var express = require('express');
var controller = require('./infringement.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasRole('inspector'), controller.create);
router.put('/:id', auth.hasRole('inspector'), controller.update);
router.patch('/:id', auth.hasRole('inspector'), controller.update);
router.delete('/:id', auth.hasRole('inspector'), controller.destroy);

// Added routes

router.get('/:id/company', auth.hasRole('inspector'), controller.getFewCompany);

module.exports = router;