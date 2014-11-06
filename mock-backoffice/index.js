'use strict';

var express = require('express');
var low = require('lowdb');
var db = low(__dirname + '/db/db.json');

var app = express();
// Config
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var clear = function (req, res) {
  // Clear transaction
  db('transactions').remove();
  res.header('Content-Type', 'application/xml');
  res.render('xmlReply', { reply: true });
};

var processTransaction = function (req, res) {  
  var txnDescription = req.query.transactionDescription;
  
  db('transactions').push({ 
    description: txnDescription 
  });

  res.header('Content-Type', 'application/xml');
  res.render('xmlReply', { reply: true });
};

var view = function (req, res) {
  var teamId = req.query.teamid;

  if (teamId !== 'G3T7') {
    return res.status(403).send('Wrong Team');
  }

  res.header('Content-Type', 'text/html');
  var transactions = db('transactions').value();
  res.render('viewTransaction', { transactions: transactions });
};

var checkCredentials = function(req, res, next) {
  var teamId = req.query.teamId;
  var teamPassword = req.query.teamPassword;

  if (teamId !== 'G3T7' || teamPassword !== 'lime') {
    return res.status(404).send('Wrong ID or Password');
  }

  next();
};

app.get('/aabo/Service.asmx/ProcessTransaction', checkCredentials, processTransaction);
app.post('/aabo/Service.asmx/ProcessTransaction', checkCredentials, processTransaction);

app.get('/Clear.aspx', checkCredentials, clear);
app.post('/Clear.aspx', checkCredentials, clear);

app.get('/ViewTrans.aspx', view);

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});