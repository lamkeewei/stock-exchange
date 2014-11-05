var db = require('../../config/sequelize');
var Bid = db.Bid;
var Ask = db.Ask;
var Promise = require("bluebird");
var sequelize = db.sequelize;
var Sequelize = require('sequelize');

exports.attemptMatch = function (stock) {
  // Place to store all the transaction details
  var transactionDetails = {};

  sequelize.transaction({
    isolationLevel: Sequelize.Transaction.SERIALIZABLE || 'SERIALIZABLE'
  }, function(t){
    // Find lowestAsk
    return Ask.findAll({ 
      limit: 1, order: ['price', 'date'], where: { matchedBuy: null, stock: stock } 
    }).then(function(ask){
      if (ask.length < 1) { throw new Error('No unfulfilled ask'); }
      
      // Store lowest ask
      transactionDetails.lowestAsk = ask[0];

      // Find highest bid
      return Bid.findAll({ 
        limit: 1, order: [['price', 'DESC'], ['date', 'ASC']], where: { matchedAsk: null, stock: stock } 
      })
    }).then(function(bid){      
      if (bid.length < 1) { throw new Error('No unfulfilled bid'); }
      
      // Store lowest bid
      transactionDetails.highestBid = bid[0];

      // Check if there's a match
      if (transactionDetails.lowestAsk.price > transactionDetails.highestBid.price) {
        throw new Error('No match found');
      }

      // Update matched bid
      return Bid.update({ 
        matchedAsk: transactionDetails.lowestAsk.id
      }, {
        where: {
          id: transactionDetails.highestBid.id
        },
        transaction: t
      });
    }).then(function(){
      // Update matched ask
      return Ask.update({
        matchedBuy: transactionDetails.highestBid.id
      }, {
        where: {
          id: transactionDetails.lowestAsk.id
        },
        transaction: t
      });
    });
  }).then(function(){
    // Committed -> Send email and log next          
  }).catch(function(err){
    console.log(err.message);
  });
};