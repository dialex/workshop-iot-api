var express = require('express');
var router = express.Router();
var lcd = require('../src/lcd'),
    StringMapper = require('../src/stringmapper'),
    sm = new StringMapper();;

router.get('/print', function(req, res){
  sm.parse(req.query.word, function(payload) {
    lcd.sendToLCD(payload);

    res.sendStatus(201);
  });
});

router.get('/map', function(req, res){
  sm.addMapping(req.query.initialWord, req.query.newWord, function() {
    res.sendStatus(201);
  });
});

router.get('/clear', function(req, res){
  lcd.clearScreen();

  res.sendStatus(201);
});

router.get('/list', function(req, res){
  sm.getMaps(function(maps){
    lcd.displayMappings(maps);
  });

  res.sendStatus(201);
});

router.delete('/map', function(req, res){
  sm.deleteMapping(req.query.initialWord, function(){
    res.sendStatus(201);
  });
});

router.delete('/reset', function(req, res){
  sm.fullReset(function() {
    res.sendStatus(201);
  });
});

module.exports = router;
