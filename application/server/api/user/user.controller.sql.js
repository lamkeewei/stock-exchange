var db = require('../../config/sequelize');
var User = db.User;

exports.index = function (req, res) {
  User.findAll()
    .success(function(users){
      res.json(200, users);
    });
};

exports.get = function (req, res) {
  User.find({ where: { userId: req.params.user } })
    .success(function(user){
      res.json(200, user);
    });
};