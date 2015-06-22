'use strict';

var express = require('express');
var controller = require('./independent.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.hasRole('independent'), controller.show);
router.post('/', auth.hasRole('independent'), controller.create);
router.put('/:id', auth.hasRole('independent'), controller.update);
router.patch('/:id', auth.hasRole('independent'), controller.update);
router.delete('/:id', auth.hasRole('independent'), controller.destroy);

module.exports = router;
