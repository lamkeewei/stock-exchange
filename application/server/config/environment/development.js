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
    // uri: 'mysql://root@192.168.2.77:7000/stocks_exchange'
  },

  seedDB: true
};
