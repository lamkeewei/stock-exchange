var config = require('../config/environment');
var Sequelize = require('sequelize');

if (!global.hasOwnProperty('db')) {
  var sequelize;

  if (process.env.DB_TYPE === 'mysql') {
    sequelize = new Sequelize(config.mysql.dbname, config.mysql.username, null, {
      host: config.mysql.host,
      port: config.mysql.port,
      maxConcurrentRequest: 200,
      dialect: 'mysql'
    });
  } else {    
    sequelize = new Sequelize(config.postgres.dbname, config.postgres.username, null, {
      host: config.postgres.host,
      port: config.postgres.port,
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