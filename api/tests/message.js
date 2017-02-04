//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Message = require('../models/message');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();
let serverPath = 'api'

chai.use(chaiHttp);

//Our parent block
describe('Messages', () => {

  beforeEach((done) => { //Before each test we empty the database
    Message.remove({}, (err) => {
      done();
    });
  });

  describe('/GET message', () => {
    it('should GET all the messages', (done) => {
      chai.request(server)
        .get(serverPath + '/message')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST message', () => {
    it('should POST a message', (done) => {
      let message = {
        text: "I see you",
        author: "Sauron"
      }
      chai.request(server)
        .post(serverPath + '/message')
        .send(message)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

});
