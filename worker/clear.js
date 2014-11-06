var db = require('./models');
var MatchedLog = db.MatchedLog;
var http = require('http');

MatchedLog.findAll({
  where: { status: 'not sent' }
}).success(function(matched){
  matched.forEach(function(m){
    var str = JSON.stringify(m);

    http.get('http://localhost:3030/ProcessTransaction.aspx?teamId=G3T7&teamPassword=abc&transactionDescription=' + str, function(response){
      var xml = '';
      response.on('data', function(chunk){
        xml += chunk;
      });

      if (xml.indexOf('true') > -1) {

      } 
    }).on('error', function(){

    })
  });
});
