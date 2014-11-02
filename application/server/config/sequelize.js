var config = require('../config/environment');
var Sequelize = require('sequelize');

if (!global.hasOwnProperty('db')) {
  var sequelize = new Sequelize(config.postgres.dbname, config.postgres.username, null, {
    host: config.postgres.host,
    port: config.postgres.port,
    maxConcurrentRequest: 200,
    dialect: 'postgres'
  });

  global.db = {
    sequelize: sequelize,
    Bid: sequelize.import(__dirname + '/../api/buy/buy.sql.model'),
    Ask: sequelize.import(__dirname + '/../api/sell/sell.sql.model')
  };
}

module.exports = global.db;