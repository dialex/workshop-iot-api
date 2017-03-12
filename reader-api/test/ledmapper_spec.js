var expect       = require('chai').expect,
    should       = require('chai').should(),
    LedMapper = require('../src/ledmapper');

describe('Led Mapper', function(){

  it('should return at least the Led that is being requested', function(done){
    var lm = new LedMapper();

    lm.returnLeds(1, function(err, map) {
      expect(map.should.deep.equal({'led':[1]}));

      done();
    });
  });

  it('should return an error if Led being requested is out of range', function(done) {
    var lm = new LedMapper()

    lm.returnLeds(12, function(err, map) {
      expect(err.should.equal("Led choice out of range"));

      done();
    });
  })

  it('should accept an integer to add a mapping', function(done) {
    var lm = new LedMapper();

    lm.addMapping(1, 2, function(valid) {
      expect(valid.should.equal(true));

      done();
    });
  });

  it('should return an error if the mapping is out of bounds', function(done){
    var lm = new LedMapper();

    lm.addMapping(1, 12, function(valid) {
      expect(valid.should.equal(false));

      done();
    });
  });

  it('should return an error if the id is out of bounds', function(done){
    var lm = new LedMapper();

    lm.addMapping(12, 1, function(valid) {
      expect(valid.should.equal(false));

      done();
    });
  });

  it('should return original Led and Mapping', function(done) {
    var lm = new LedMapper();

    lm.addMapping(1, 2, function() {
      lm.returnLeds(1, function(err, map) {
        expect(map.should.deep.equal({'led':[1, 2]}));

        done();
      });
    });
  });

  it('should be able fully reset mappings', function(done) {
    var lm = new LedMapper();

    lm.addMapping(1, 2, function() {
      lm.resetMappings(function(){
        lm.returnLeds(1, function(err, map){
          expect(map.should.deep.equal({'led':[1]}));

          done();
        })
      });
    });
  });

  it('should be able to remove a mapping', function(done) {
    var lm = new LedMapper();

    lm.addMapping(1, 2, function(){
      lm.addMapping(1, 3, function(){
        lm.removeMapping(1, 2, function(){
          lm.returnLeds(1, function(err, map){
            expect(map.should.deep.equal({'led':[1, 3]}));

            done();
          });
        });
      });
    });
  });

})
