var db = require('../../config/sequelize');
var Ask = db.Ask;
var matcher = require('./../matcher/matcher.sql');

exports.index = function(req, res) {
  Ask
    .findAll({
      where: { matchedBuy: null }
    })
    .success(function (asks) {
      // if(!asks) { return handleError(res, {}); }
      return res.json(200, asks);
    });
};

// Creates a new sell in the DB.
exports.create = function(req, res) {
  req.body.date = new Date();
  
  Ask.create(req.body)
    .success(function(){
      res.send(201);
      matcher.attemptMatch(req.body.stock);
    });
};

exports.getLowestAsk = function (req, res) {
  Ask.findAll({ 
    limit: 1, order: ['price', 'date'], where: { matchedBuy: null, stock: req.params.stock } 
  }).success(function(asks){
    return res.json(200, asks);
  });
};

function handleError(res, err) {
  return res.send(500, err);
};