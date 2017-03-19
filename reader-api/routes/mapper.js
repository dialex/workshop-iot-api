var express = require('express');
var router = express.Router();
var LedMapper = require('../src/ledmapper'),
    lm = new LedMapper();
var button = require('../src/button');

router.get('/toggle', function(req, res){
  lm.returnLeds(parseInt(req.query.led), function(err, mappings) {
    if(err){
      res.status(400).send(JSON.stringify({'error': err}));
    } else {
      button.toggleLed(mappings, function(error){
        if (error){
          res.status(500).send(error);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

router.get('/map', function(req, res){
  lm.addMapping(parseInt(req.query.led), parseInt(req.query.mappedLed), function(result){
    if(result){
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  });
});

router.delete('/map', function(req, res){
  lm.removeMapping(parseInt(req.query.led), parseInt(req.query.mappedLed), function(result){
      res.sendStatus(201);
  });
});

router.delete('/reset', function(req, res){
  lm.resetMappings(function() {
    button.resetLeds(function(error){
      if (error){
        res.status(500).send(error);
      } else {
        res.sendStatus(201);
      }
    });
  });
});

router.get('/colour', function(req, res) {
  var colourPayload = {
    "id": parseInt(req.query.led),
    "red": parseInt(req.query.red),
    "green": parseInt(req.query.green),
    "blue": parseInt(req.query.blue)
  };

  button.colourLed(colourPayload, function(error){
    if (error){
      res.status(500).send(error);
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;
