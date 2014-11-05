var db = require('../../config/sequelize');
var Bid = db.Bid;
var Ask = db.Ask;
var Promise = require("bluebird");
var sequelize = db.sequelize;

exports.attemptMatch = function (stock) {
  
  // Package them into an array of promises and execute them async for performance
  var promises = [
    Ask.findAll({ limit: 1, order: ['price', 'date'], where: { matchedBuy: null, stock: stock } }),
    Bid.findAll({ limit: 1, order: [['price', 'DESC'], ['date', 'ASC']], where: { matchedAsk: null, stock: stock } })
  ];

  Promise.settle(promises)
    .then(function(data){      
      // returned data will be in _settledValue

      // If either there are no asks or not bids, return straight      
      if (data[0]._settledValue.length < 1) { return; }
      if (data[1]._settledValue.length < 1) { return; }

      // There is a potential match
      var lowestAsk = data[0]._settledValue[0];
      var highestBid = data[1]._settledValue[0];

      // Match exists if lowestAsk price is lower or equals to highestBid price
      if (lowestAsk.price <= highestBid.price) {        
        // execute match in transaction        
        sequelize.transaction(function(t){
          return Bid.update({ 
            matchedAsk: lowestAsk.id, 
            version: highestBid.version + 1 
          }, {
            where: {
              version: highestBid.version,
              id: highestBid.id
            },
            transaction: t
          }).then(function(rowsBid){
            // Check if the version has changed since the select
            if (rowsBid < 1) { throw new Error(); }

            return Ask.update({
              matchedBuy: highestBid.id, 
              version: lowestAsk.version + 1 
            }, {
              where: {
                version: lowestAsk.version,
                id: lowestAsk.id
              },
              transaction: t
            }).then(function(rowsAsk){
              // Check if the version has changed since the select
              if (rowsAsk < 1) { throw new Error(); }                
            });
          })
        }).then(function(){
          // Committed -> Send email and log next          
        }).catch(function(){
          console.log('concurrent matched failed');
        });
      }
    });
};