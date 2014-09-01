'use strict';

var _ = require('lodash');
var Buy = require('./buy.model');

// Get list of buys
exports.index = function(req, res) {
  Buy.find(function (err, buys) {
    if(err) { return handleError(res, err); }
    return res.json(200, buys);
  });
};

// Get a single buy
exports.show = function(req, res) {
  Buy.findById(req.params.id, function (err, buy) {
    if(err) { return handleError(res, err); }
    if(!buy) { return res.send(404); }
    return res.json(buy);
  });
};

// Get buys by user
exports.getByUser = function(req, res){
  var userId = req.params.userId;  
  Buy.find({ userId: userId }, function(err, buys){
    if(err) { return handleError(res, err); }
    return res.json(200, buys);
  });
};

// Creates a new buy in the DB.
exports.create = function(req, res) {
  Buy.create(req.body, function(err, buy) {
    if(err) { return handleError(res, err); }
    return res.json(201, buy);
  });
};

// Updates an existing buy in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Buy.findById(req.params.id, function (err, buy) {
    if (err) { return handleError(res, err); }
    if(!buy) { return res.send(404); }
    var updated = _.merge(buy, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, buy);
    });
  });
};

// Deletes a buy from the DB.
exports.destroy = function(req, res) {
  Buy.findById(req.params.id, function (err, buy) {
    if(err) { return handleError(res, err); }
    if(!buy) { return res.send(404); }
    buy.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}