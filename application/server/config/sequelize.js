var config = require('../config/environment');
var Sequelize = require('sequelize');

if (!global.hasOwnProperty('db')) {
  var sequelize;

  if (process.env.DB_TYPE === 'mysql') {
    sequelize = new Sequelize(config.mysql.uri, {
      maxConcurrentRequest: 5000,
      dialect: 'mysql'
    });
  } else {    
    sequelize = new Sequelize(config.postgres.uri, {
      maxConcurrentRequest: 5000,
      dialect: 'postgres'
    });
  }

  global.db = {
    sequelize: sequelize,
    Bid: sequelize.import(__dirname + '/../api/buy/buy.sql.model'),
    Ask: sequelize.import(__dirname + '/../api/sell/sell.sql.model'),
    User: sequelize.import(__dirname + '/../api/user/user.sql.model'),
    MatchBuy: sequelize.import(__dirname + '/../api/matcher/matchBuy.sql.model'),
    MatchAsk: sequelize.import(__dirname + '/../api/matcher/matchAsk.sql.model')
  };
}

module.exports = global.db;