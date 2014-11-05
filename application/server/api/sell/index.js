'use strict';

var express = require('express');
var controller = require('./sell.controller.sql');

var router = express.Router();

router.get('/', controller.index);
router.get('/lowest/:stock', controller.getLowestAsk);
router.post('/', controller.create);
module.exports = router;