//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Status', () => {

  let URL = 'http://localhost:8080/api'

  describe('/GET status', () => {
    it('should return a status', (done) => {
      chai.request(server)
        .get(URL + '/status')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

});
