var db = require('../../config/sequelize');
var Bid = db.Bid;
var User = db.User;
var sequelize = db.sequelize;
var Sequelize = require('sequelize');
var Q = require('q');
var matcher = require('./../matcher/matcher.sql');

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

// Creates a new sell in the DB.
exports.create = function(req, res) {
  var data = req.body;
  data.date = new Date();
  User.find({ userId: data.userId })
    .success(function(user){      
      if (user) {
        var newCredit = user.creditUsed + data.price * 1000;
        if (newCredit >= 1000000) {
          return res.json(201, { status: 'not enough credit'});
        }

        // Wrap in a transaction
        sequelize.transaction(function(t){
          return User.update({ 
            creditUsed: newCredit, 
            version: user.version + 1 
          }, {
            where: {
              version: user.version,
              userId: user.userId
            },
            transaction: t
          }).then(function(d){            
            // Check if the number of rows affected is greater than 1
            // If it is throw an error to rollback
            if (d < 1) { throw new Error(); }

            // No change - good to go...
            return Bid.create(req.body, { transaction: t });                    
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
        User.create({ userId: data.userId, creditUsed: data.price * 1000 });
        Bid.create(req.body)
        .success(function(){
          res.json(201, { status: 'success'});
          matcher.attemptMatch(req.body.stock);
        });
      }      
    });
};

var handleError = function (res, err) {
  return res.send(500, err);
};