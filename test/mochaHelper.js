'use strict';
/* global before, after */
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

after(function (done) {
  var connection = mongoose.connection;
  if (!connection.name.match(/test/i)) {
    done(new Error('Database name didn\'t contain test. Not dropping it.'));
    return;
  }
  connection.db.dropDatabase(function (err) {
    if (err) {
      done(new Error('Error when dropping test db. ' + err));
    } else {
      done();
    }
  });
});
