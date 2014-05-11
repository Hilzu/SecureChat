'use strict';

var _ = require('lodash')
  , defaultConf, developmentConf, env, extraConf, productionConf, testConf;

env = process.env.NODE_ENV || 'development';

defaultConf = {
  logger: 'dev',
  port: process.env.PORT || 3000,
  mongoUri: 'mongodb://localhost/SecureChat'
};

developmentConf = {};

productionConf = {
  mongoUri: process.env.MONGOLAB_URI
};

testConf = {
  mongoUri: 'mongodb://localhost/SecureChatTest'
};

extraConf = {
  development: developmentConf,
  production: productionConf,
  test: testConf
}[env];

module.exports = _.merge(defaultConf, extraConf);
