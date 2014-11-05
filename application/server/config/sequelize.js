var config = require('../config/environment');
var Sequelize = require('sequelize');

if (!global.hasOwnProperty('db')) {
  var sequelize;

  if (process.env.DB_TYPE === 'mysql') {
    sequelize = new Sequelize(config.mysql.uri, {
      maxConcurrentRequest: 200,
      dialect: 'mysql'
    });
  } else {    
    sequelize = new Sequelize(config.postgres.uri, {
      maxConcurrentRequest: 200,
      dialect: 'postgres'
    });
  }

  global.db = {
    sequelize: sequelize,
    Bid: sequelize.import(__dirname + '/../api/buy/buy.sql.model'),
    Ask: sequelize.import(__dirname + '/../api/sell/sell.sql.model'),
    User: sequelize.import(__dirname + '/../api/user/user.sql.model')
  };
}

module.exports = global.db;