'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI || 
         'mongodb://localhost:27017,localhost:27018,localhost:27019/application-dev'
  },

  seedDB: true
};
