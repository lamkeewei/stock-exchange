'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI || 
         'mongodb://localhost/application-dev'
  },

  postgres: {
    dbname: 'stocks_exchange',
    username: 'postgres',
    host: 'localhost',
    port: 5432
  },

  mysql: {
    dbname: 'stocks_exchange',
    username: 'root',
    host: 'localhost',
    port: 3306
  },

  seedDB: true
};
