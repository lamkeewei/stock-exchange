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
    username: 'postgres'
  },

  seedDB: true
};
