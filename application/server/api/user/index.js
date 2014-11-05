'use strict';

var express = require('express');
var controller = require('./user.controller.sql');

var router = express.Router();

router.get('/', controller.index);
router.get('/:user', controller.get);
module.exports = router;