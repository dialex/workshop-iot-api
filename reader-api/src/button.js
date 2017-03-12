var request = require("request");
var deviceId = '36002a001147333433363331';
var token = 'f9a1ea0ca821f32ad55796bced74abe5c483b2b0';
var baseUrl = 'https://api.particle.io/v1/devices/' + deviceId;

var options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  form: {
    access_token: token
  }
};

var button = {

  toggleLed: function(mappings, callback){
    options.url = baseUrl + '/toggle';
    options.form.args = JSON.stringify(mappings);

    request(options, function (error) {
      callback(error);
    });
  },

  resetLeds: function(callback){
    options.url = baseUrl + '/reset';

    request(options, function (error) {
      callback(error);
    });
  },

  colourLed: function(colour, callback){
    options.url = baseUrl + '/colour';
    options.form.args = JSON.stringify(colour);

    request(options, function (error) {
      callback(error);
    });
  }

}

module.exports = module = button;
