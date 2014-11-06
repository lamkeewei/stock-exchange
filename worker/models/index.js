var Sequelize = require('sequelize');

if (!global.hasOwnProperty('db')) {
  var sequelize;

  if (process.env.DB_TYPE === 'mysql') {
    sequelize = new Sequelize('mysql://root@localhost:3306/stocks_exchange', {
      maxConcurrentRequest: 5000,
      dialect: 'mysql'
    });

    // sequelize = new Sequelize('stocks_exchange', 'root', null, {
    //   host: '192.168.2.69',
    //   port: '3307',
    //   maxConcurrentRequest: 5000,
    //   dialect: 'mariadb'
    // });
  } else {    
    sequelize = new Sequelize('postgresql://postgres:password@192.168.2.100:5432/stocks_exchange', {
      maxConcurrentRequest: 5000,
      dialect: 'postgres'
    });
  }

  global.db = {
    sequelize: sequelize,
    MatchedLog: sequelize.import(__dirname + '/matchedLog'),
    RejectedLog: sequelize.import(__dirname + '/rejectedLog')
  };
}

module.exports = global.db;