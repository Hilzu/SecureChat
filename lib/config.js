'use strict';

var _ = require('lodash')
  , defaultConf, developmentConf, env, extraConf, productionConf, testConf;

env = process.env.NODE_ENV || 'development';

defaultConf = {
  port: process.env.PORT || 3000
};

developmentConf = {
  logger: 'dev',
  mongoUri: 'mongodb://localhost/SecureChat'
};

productionConf = {
  logger: 'default',
  mongoUri: process.env.MONGOLAB_URI
};

testConf = {
  logger: function () {},
  mongoUri: 'mongodb://localhost/SecureChatTest'
};

extraConf = {
  development: developmentConf,
  production: productionConf,
  test: testConf
}[env];

module.exports = _.merge(defaultConf, extraConf);
