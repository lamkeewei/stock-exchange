'use strict';

var _ = require('lodash');
var Q = require('q');
var Buy = require('./../buy/buy.model');
var Sell = require('./../sell/sell.model');

var maxBid = function(stock){
  var deferred = Q.defer();
  Buy
    .find({ stock: stock })
    .where('match').equals(null)
    .sort('-price')
    .limit(1)
    .exec(function(err, buys){
      if (err) { return deferred.reject(err); }
      deferred.resolve(buys[0]);
    });

  return deferred.promise;
};

exports.maxBid = maxBid;

var minAsk = function(stock){
  var deferred = Q.defer();
  Sell
    .find({ stock: stock })
    .where('match').equals(null)
    .sort('price')
    .limit(1)
    .exec(function(err, sells){
      if (err) { return deferred.reject(err); }

      deferred.resolve(sells[0]);
    });

  return deferred.promise;
};

exports.minAsk = minAsk;

var getLatestPrice = function(stock){
  var deferred = Q.defer();

  Buy
    .find({ stock: stock })
    .where('match').ne(null)
    .sort('-date')
    .limit(1)
    .populate('match')
    .exec(function(err, bids){
      if (err) { return deferred.reject(err); }

      var bid = bids[0];
      var price = 0;

      if (bid) {
        price = bid.price > bid.match.price ? bid.price : bid.match.price;
      } 

      deferred.resolve(price);
    });

    return deferred.promise;
};

exports.getUserAmount = function(userId) {
  var deferred = Q.defer();
  Buy
    .find({ userId: userId })
    .select('price')
    .exec(function(err, buys){
      if (err) { return deferred.reject(err); }
      var totalBuy = _.reduce(buys, function(count, buy){
        count += buy.price;
        return count;
      }, 0);

      deferred.resolve(totalBuy * 1000);
    });

  return deferred.promise;
};

exports.getStats = function(req, res){
  var stock = req.params.stock;    

  Q.all([maxBid(stock), minAsk(stock), getLatestPrice(stock)])
    .then(function(stats){
      var output = {
        stock: stock,
        maxBid: stats[0] ? stats[0].price : 0,
        minAsk: stats[1] ? stats[1].price : 0,
        latestPrice: stats[2]
      }

      res.send(200, output);
    }, function(){
      console.log(err);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}
