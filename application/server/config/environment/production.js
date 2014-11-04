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
};