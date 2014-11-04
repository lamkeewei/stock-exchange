var db = require('../../config/sequelize');
var Bid = db.Bid;
var User = db.User;

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

        // Update user credit
        user.creditUsed = newCredit;
        user.save();

        Bid.create(req.body)
        .success(function(){
          res.json(201, { status: 'success'});
        });        
      } else {
        // New user
        User.create({ userId: data.userId, creditUsed: data.price * 1000 });
        Bid.create(req.body)
        .success(function(){
          res.json(201, { status: 'success'});
        });
      }
    });
};

function handleError(res, err) {
  return res.send(500, err);
};