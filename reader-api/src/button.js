var request = require("request");
var deviceId = process.env.DEVICEID;
var token = process.env.TOKEN;
var baseUrl = 'https://api.particle.io/v1/devices/' + deviceId;

console.log("Using Token: " + token);
console.log("Using DeviceID: " + deviceId);

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
