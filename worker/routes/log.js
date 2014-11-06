var express = require('express');
var router = express.Router();
var db = require('../models');
var MatchedLog = db.MatchedLog;
var RejectedLog = db.RejectedLog;
var http = require('http');
var messenger = require('messenger');
var fs = require('fs');

var rejectedLogFileName = process.env.REJECTED_FILE || 'rejected.log' 
var rejectedLogFile = __dirname + '/../log/' + rejectedLogFileName;
console.log(rejectedLogFile);

var matchedLogFileName = process.env.MATCHED_FILE || 'matched.log';
var matchedLogFile = __dirname + '/../log/' + matchedLogFileName; 
console.log(matchedLogFile);

var targetHost = process.env.TARGET_HOST || 'localhost';
var targetPort = process.env.TARGET_PORT || 3032;

// RESTful endpoint
router.get('/', function(req, res) {
  res.send('log');
});

router.get('/rejected', function(req, res){
  var data = JSON.parse(req.query.data);
  RejectedLog.create(data)
    .success(function(){
      var str = 'stock: ' + data.stock + ', price: ' + data.price + ', userId: ' + data.userId + ', date: ' + data.date + '\r\n';
      fs.appendFile(rejectedLogFile, str, function(){
        http.get({ host: targetHost, port: targetPort, path: '/log/replicate/rejected?data=' + req.query.data, agent: false }, function(response){            
        }).on('error', function(err){ console.log(err); });
        res.send(200);
      });      
    })
    .error(function(err){
      console.log(err);
      res.send(500);
    });
});

router.get('/replicate/match', function (req, res){
  var data = JSON.parse(req.query.data); 
  var str = 'stock: ' + data.stock + ', amt: ' + data.price + ', bidder userId: ' + data.buyer + ', seller userId: ' + data.seller + ', date: ' + data.date + '\r\n';
  fs.appendFile(matchedLogFile, str, function(){
    res.send(200);    
  });  
});

router.get('/replicate/rejected', function (req, res){
  var data = JSON.parse(req.query.data);
  var str = 'stock: ' + data.stock + ', price: ' + data.price + ', userId: ' + data.userId + ', date: ' + data.date + '\r\n';
  fs.appendFile(rejectedLogFile, str, function(){
    res.send(200);
  });      
});

router.get('/match', function(req, res) {
  var data = JSON.parse(req.query.data);
  // Try to send to back office
  var str = 'stock: ' + data.stock + ', amt: ' + data.price + ', bidder userId: ' + data.buyer + ', seller userId: ' + data.seller + ', date: ' + data.date;
  // var url = 'http://10.0.106.239:81/aabo/Service.asmx/ProcessTransaction?teamId=G3T7&teamPassword=lime&transactionDescription=' + str;
  var url = 'http://localhost:3030/aabo/Service.asmx/ProcessTransaction?teamId=G3T7&teamPassword=lime&transactionDescription=' + str;

  http.get(url, function(response){
    // Check response
    var xml = '';
    response.on('data', function(chunk){ xml += chunk; });

    response.on('end', function(){
      if (xml.indexOf('true') > -1) {
        var str = 'stock: ' + data.stock + ', amt: ' + data.price + ', bidder userId: ' + data.buyer + ', seller userId: ' + data.seller + ', date: ' + data.date + '\r\n';
        fs.appendFile(matchedLogFile, str, function(){
          http.get({ host: targetHost, port: targetPort, path: '/log/replicate/match?data=' + req.query.data, agent: false }, function(response){            
          }).on('error', function(err){ console.log(err); });
          res.send(200);
        });
      } else {
        // XML does not contain true
        return res.send(500);
      }
    });
  }).on('error', function(err){
    // Send to back office fail
    return res.send(500);
  });
});

module.exports = router;
