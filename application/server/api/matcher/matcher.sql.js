var db = require('../../config/sequelize');
var Bid = db.Bid;
var Ask = db.Ask;
var MatchBuy = db.MatchBuy;
var MatchAsk = db.MatchAsk;
var Promise = require("bluebird");
var sequelize = db.sequelize;
var Sequelize = require('sequelize');
var http = require('http');

var backendWorkers = ['localhost:3031', 'localhost:3032']; 

var logMatched = function (matched) {
  var str = JSON.stringify(matched);
  console.log('log: ' + str);

  var host = 0;
  var send = function(str){
    var hostPort = backendWorkers[host++%2].split(':');
    var url = 'http://' + hostPort.join(':') + '/log/match?data=' + str;
    console.log('try send: ' + url);

    http.get({ host: 'localhost', port: hostPort[1], path: '/log/match?data=' + str, agent: false }, function(response){
      console.log("Backend worker response: " + response.statusCode);
      if (response.statusCode === 500) {
        setImmediate(function(){
          send(str); 
        });  
      }
    }).on('error', function(e){
      setImmediate(function(){
        send(str); 
      });
    });
  };

  send(str);
};

exports.attemptMatch = function (stock) {
  // Place to store all the transaction details
  var transactionDetails = {};

  var promises = [
    Ask.findAll({ limit: 1, order: ['price', 'date'], where: { stock: stock } }),
    Bid.findAll({ limit: 1, order: [['price', 'DESC'], ['date', 'ASC']], where: { stock: stock } })
  ];


  Promise.settle(promises).then(function(data){
    
    if (data[0]._settledValue.length < 1) {
      throw new Error("No unfulfilled asks");
    }

    if (data[0]._settledValue.length < 1) {
      throw new Error("No unfulfilled bids");
    }

    var lowestAsk = data[0]._settledValue[0];
    var highestBid = data[1]._settledValue[0];
    var txnDate = new Date();

    if (lowestAsk && highestBid && lowestAsk.price <= highestBid.price) {
      sequelize.transaction({
        // autocommit: false,
        isolationLevel: 'READ COMMITTED'
      }, function(t){
        return MatchBuy.create({
          matchedAsk: lowestAsk.id,
          matchedBuy: highestBid.id,
          date: txnDate,
          price: highestBid.price,
          stock: highestBid.stock,
          buyer: highestBid.userId,
          seller: lowestAsk.userId
        }, {
          transaction: t,
          returning: false
        }).then(function(){
          return MatchAsk.create({
            matchedAsk: lowestAsk.id,
            matchedBuy: highestBid.id,
            date: txnDate,
            price: highestBid.price,
            stock: highestBid.stock,
            buyer: highestBid.userId,
            seller: lowestAsk.userId
          }, {
            transaction: t,
            returning: false
          })
        }).then(function(){
          return Bid.destroy({
            where: {
              id: highestBid.id
            },
            transaction: t
          });
        }).then(function(){
          return Ask.destroy({
            where: { id: lowestAsk.id },
            transaction: t
          });
        });
      }).then(function(){
        console.log('success');
        logMatched({
          matchedAsk: lowestAsk.id,
          matchedBuy: highestBid.id,
          date: txnDate,
          price: highestBid.price,
          stock: highestBid.stock,
          buyer: highestBid.userId,
          seller: lowestAsk.userId
        });
      }).catch(function(err){
        console.log('error');
        console.log(err);
      });
    }

  //     sequelize.transaction({
  //       autocommit: false,
  //       isolationLevel: 'READ COMMITTED'
  //     }, function(t){
  //       return Bid.update({ 
  //         matchedAsk: lowestAsk.id,
  //         version: highestBid.version + 1
  //       }, {
  //         where: {
  //           id: highestBid.id,
  //           version: highestBid.version
  //         },
  //         transaction: t
  //       }).then(function(c){
  //         if (c === 0) { throw new Error("Version updated"); }

  //         return Ask.update({
  //           matchedBuy: highestBid.id,
  //           version: lowestAsk.version + 1
  //         }, {
  //           where: { 
  //             id: lowestAsk.id,
  //             version: lowestAsk.version 
  //           },
  //           transaction: t
  //         });
  //       }).then(function(d){
  //         if (d === 0) { throw new Error("Version updated"); }
  //       });

  //     }).then(function(){
  //       console.log('success');
  //     }).catch(function(){
  //       console.log('error');
  //     });
  //   }    
  }).catch(function(err){
    console.log(err.message);
  });
  
  // sequelize.transaction({
  //   autocommit: false,
  //   isolationLevel: 'READ COMMITTED'
  // }, function(t){
  //   // Find lowestAsk
  //   return Ask.findAll({ 
  //     limit: 1, order: ['price', 'date'], where: { matchedBuy: null, stock: stock } 
  //   }).then(function(ask){
  //     if (ask.length < 1) { throw new Error('No unfulfilled ask'); }
      
  //     // Store lowest ask
  //     transactionDetails.lowestAsk = ask[0];

  //     // Find highest bid
  //     return Bid.findAll({ 
  //       limit: 1, order: [['price', 'DESC'], ['date', 'ASC']], where: { matchedAsk: null, stock: stock } 
  //     })
  //   }).then(function(bid){      
  //     if (bid.length < 1) { throw new Error('No unfulfilled bid'); }
      
  //     // Store lowest bid
  //     transactionDetails.highestBid = bid[0];

  //     // Check if there's a match
  //     if (transactionDetails.lowestAsk.price > transactionDetails.highestBid.price) {
  //       throw new Error('No match found');
  //     }

  //     // Update matched bid
      // return Bid.update({ 
      //   matchedAsk: transactionDetails.lowestAsk.id
      // }, {
      //   where: {
      //     id: transactionDetails.highestBid.id
      //   },
      //   transaction: t
      // });
  //   }).then(function(){
  //     // Update matched ask
    //   return Ask.update({
    //     matchedBuy: transactionDetails.highestBid.id
    //   }, {
    //     where: {
    //       id: transactionDetails.lowestAsk.id
    //     },
    //     transaction: t
    //   });
    // });
  // }).then(function(){
  //   // Committed -> Send email and log next          
  // }).catch(function(err){
  //   console.log(err.message);
  // });
};