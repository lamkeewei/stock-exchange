'use strict';

var _ = require('lodash');
var Q = require('q');
var Buy = require('./../buy/buy.model');
var Sell = require('./../sell/sell.model');

var maxBid = function(stock){
  var deferred = Q.defer();
  Buy
    .find({ stock: stock })
    .sort('-price')
    .limit(1)
    .exec(function(err, buys){
      if (err) { return deferred.reject(err); }          
      if (!buys[0]) { return deferred.resolve(0); };

      deferred.resolve(buys[0].price);
    });

  return deferred.promise;
};

exports.maxBid = maxBid;

var minAsk = function(stock){
  var deferred = Q.defer();
  Sell
    .find({ stock: stock })
    .sort('price')
    .limit(1)
    .exec(function(err, sells){
      if (err) { return deferred.reject(err); }

      if (!sells[0]) { return deferred.resolve(0); };
      deferred.resolve(sells[0].price);
    });

  return deferred.promise;
};

exports.minAsk = minAsk;

exports.getStats = function(req, res){
  var stock = req.params.stock;    

  Q.all([maxBid(stock), minAsk(stock)])
    .then(function(stats){
      var output = {
        stock: stock,
        maxBid: stats[0],
        minAsk: stats[1]
      }

      res.send(200, output);
    }, function(){
      console.log(err);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}
