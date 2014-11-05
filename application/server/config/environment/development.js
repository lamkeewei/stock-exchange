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
    uri: 'postgresql://postgres@localhost:5432/stocks_exchange'
  },

  mysql: {
    uri: 'mysql://root@localhost:3306/stocks_exchange'
  },

  seedDB: true
};
