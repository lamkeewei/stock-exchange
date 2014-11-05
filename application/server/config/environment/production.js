'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            3000,

  // MongoDB connection options
  mongo: {
    // db:   {
    //         replset: { rs_name: 'rs0' }
    // },
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/application'
  },

  postgres: {
    uri: 'postgresql://postgres@localhost:5432/stocks_exchange'
  },

  mysql: {
    uri: 'mysql://root@localhost:3306/stocks_exchange'
  }
};