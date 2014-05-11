'use strict';
/* global before, afterEach */
var app = require('../server')
  , mongoose = require('mongoose')
  ;

before(function (done) {
  if (app.get('env') === 'test') {
    done();
  } else {
    done(new Error('Not using test env! Bailing out.'));
  }
});

afterEach(function (done) {
  mongoose.connection.db.dropDatabase(done);
});
