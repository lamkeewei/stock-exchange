var express = require('express');
var router = express.Router();
var db = require('../models');
var MatchedLog = db.MatchedLog;
var RejectedLog = db.RejectedLog;
var http = require('http');

router.get('/', function(req, res) {
  res.send('log');
});

router.get('/rejected', function(req, res){
  var data = JSON.parse(req.query.data);
  console.log(data);
  RejectedLog.create(data)
    .success(function(){
      res.send(200);
    })
    .error(function(err){
      console.log(err);
      res.send(500);
    });
});

router.get('/match', function(req, res) {
  // Write to database
  var data = JSON.parse(req.query.data);
  data.status = 'not sent';
  MatchedLog.create(data)
    .then(function(){
      // Try to send to back office
      http.get('http://localhost:3030/ProcessTransaction.aspx?teamId=G3T7&teamPassword=abc&transactionDescription=' + req.query.data, function(response){
        // Check response
        var xml = '';
        response.on('data', function(chunk){
          xml += chunk;
        });

        response.on('end', function(){
          console.log(xml);
          if (xml.indexOf('true') > -1) {
            // Mark as sent
            MatchedLog.update({ status: 'sent' }, {
              where: { matchedBuy: data.matchedBuy, matchedAsk: data.matchedAsk }
            }).success(function(){
              return res.send(200);
            }).error(function(){
              return res.send(500);
            });
          } else {
            return res.send(500);
          }
        });
      }).on('error', function(){
        return res.send(500);
      });
    })
    .catch(function(){
      return res.send('500');
    });
});

module.exports = router;
