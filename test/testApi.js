'use strict';
/* global describe, it */
var app = require('../server')
  , request = require('supertest')
  , util = require('../lib/util')
  , publicKey
  ;

require('./mochaHelper');

publicKey = 'w74JAwhkDFHDnU0FGcONYMKtw4bDqkHDqcKnwrLDmMKuWcOTwrHDlMODZsOi' +
  'w7EjMsKnHgfDnyYWw53DrThOWMKcKcOZJD/CnyF+QMKuwpcbwo/Dk8OabC1pbyB7w7PDt1/CuB' +
  'nDkwLDkmTDt1nCm8KIw4jDpMKzw690woDDijsAdxLCtUjDo8Ozw7jDg8KAeFZPwpAVwoIaPVor' +
  'wprDl28HQiY7w5pgwoDCpHjDoiPClMO4RxPDnMOgElnDvz3DicOISDFOccOMw5bCosKzwqAvEF' +
  'QVbS3DnFjDswI2EkhFw4AWwqA2XEs/L8O5w6HDmMOjwoPCnsO/HsO/E3AGwpp3wpDCmjw3YTXD' +
  'tcOFwpbCsRrCqsOAPMO3AEHDmsKrHRpHT8KfOz1EX8KHacOVS8OOw7plc8K7wpTCqsOAwro=';

describe('POST /users', function () {
  it('creates user', function (done) {
    request(app)
      .post('/users')
      .send({ publicKey: publicKey })
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(function (res) {
        if (!util.isGuid(res.body.guid)) {
          return 'Not a valid GUID!' + res.body;
        }
      })
      .end(done);
  });

  it('fails with missing parameters', function (done) {
    request(app)
      .post('/users')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});
