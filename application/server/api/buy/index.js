'use strict';

var express = require('express');
var controller = require('./buy.controller.sql');

var router = express.Router();

router.get('/', controller.index);
router.get('/end', controller.endTradingDay);
router.get('/highest/:stock', controller.getHighestBid);
router.get('/price/:stock', controller.getLatestPrice);
router.post('/', controller.create);

module.exports = router;