var db = require('../../config/sequelize');
var Bid = db.Bid;
var User = db.User;
var MatchBuy = db.MatchBuy;
var sequelize = db.sequelize;
var Sequelize = require('sequelize');
var Q = require('q');
var matcher = require('./../matcher/matcher.sql');
var http = require('http');
var chainer = new Sequelize.Utils.QueryChainer

var backendWorkers = ['localhost:3031', 'localhost:3032']; 

var logRejected = function (bid) {
  var str = JSON.stringify(bid);
  console.log('log: ' + str);

  var host = 0;
  var send = function(str){
    var hostPort = backendWorkers[host++%2].split(':');
    var url = 'http://' + hostPort.join(':') + '/log/rejected?data=' + str;
    console.log('try send: ' + url);

    console.log('try log rejected: ' + url);
    http.get({ host: 'localhost', port: hostPort[1], path: '/log/rejected?data=' + str, agent: false}, function(response){
      console.log("Backend worker response: " + response.statusCode);
      if (response.statusCode === 500) {
        setImmediate(function(){
          send(str) 
        });  
      }
    }).on('error', function(e){
      setImmediate(function(){
        send(str) 
      });
    });
  };

  send(str);
};

exports.index = function(req, res) {
  Bid
    .findAll({
      where: { matchedAsk: null }
    })
    .success(function (asks) {
      // if(!asks) { return handleError(res, {}); }
      return res.json(200, asks);
    });
};

exports.endTradingDay = function (req, res) {
  var sql = 'truncate table users;';  
  chainer
    .add(sequelize.query('truncate table users'))
    .add(sequelize.query('truncate table asks'))
    .add(sequelize.query('truncate table bids'))
    .add(sequelize.query('truncate table matchBuys'))
    .add(sequelize.query('truncate table matchAsks'))
    .add(sequelize.query('truncate table matchedLogs'))
    .add(sequelize.query('truncate table rejectedLogs'));

  chainer
    .run()
    .success(function(){
      return res.json(200, { status: 'success' });
    })
    .error(function(){
      return res.json(500, { status: 'error' });
    });
};

// Creates a new sell in the DB.
exports.create = function(req, res) {
  var data = req.body;
  data.date = new Date();

  User.find({ where: { userId: data.userId } })
    .success(function(user){
      if (user) {
        var newCredit = user.creditUsed + data.price * 1000;
        if (newCredit >= 1000000) {
          data.creditUsed = newCredit;
          logRejected(data);
          return res.json(201, { status: 'not enough credit'});
        }        

        // Wrap in a transaction
        sequelize.transaction({
          // isolationLevel: Sequelize.Transaction.SERIALIZABLE || 'SERIALIZABLE'
        }, function(t){
          return User.update({ creditUsed: newCredit }, 
          {
            where: { userId: user.userId },
            transaction: t,
            returning: false
          }).then(function(d){
            return Bid.create(req.body, { returning: false, transaction: t });                    
          });
        }).then(function(){
          // Success
          res.json(201, { status: 'success' });

          matcher.attemptMatch(req.body.stock);
        }).catch(function(error){
          // Rollback
          res.json(201, { status: 'An error has occurred!' });
        });
      } else {
        // New user
        User.create({ userId: data.userId, creditUsed: data.price * 1000 }, { returning: false })
          .success(function(){
            Bid.create(req.body, { returning: false })
            .success(function(){
              res.json(201, { status: 'success'});
              matcher.attemptMatch(req.body.stock);
            }).error(function(){
              res.json(201, { status: 'error'});
            });
          }).error(function(){
            res.json(201, { status: 'error'});
          });;        
      }      
    });
};

exports.getHighestBid = function (req, res) {
  Bid.findAll({ 
    limit: 1, order: [['price', 'DESC'], ['date', 'ASC']], where: { matchedAsk: null, stock: req.params.stock } 
  }).success(function(bids){
    return res.json(200, bids);
  });
};

exports.getLatestPrice = function (req, res) {
  MatchBuy.findAll({ order: [['date', 'DESC']], limit: 1, where: { stock: req.params.stock } })
    .then(function(bid){
      return res.json(200, bid);
    });
};

var handleError = function (res, err) {
  return res.send(500, err);
};