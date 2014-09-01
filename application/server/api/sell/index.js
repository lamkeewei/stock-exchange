'use strict';

var express = require('express');
var controller = require('./sell.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:userId', controller.getByUser);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/all', controller.deleteAll);
router.delete('/:id', controller.destroy);

module.exports = router;