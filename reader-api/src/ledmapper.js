var mappings = {};

function LedMapper(){
  for(var i = 0; i < 11; i++){
    mappings[i] = [];
  }
}

LedMapper.prototype.returnLeds = function(id, callback){
  if(id < 0 || id > 11){
    callback('Led choice out of range');
  } else {
    var ledArray = [id].concat(mappings[id - 1]);

    callback(null, {'led': ledArray});
  }
};

LedMapper.prototype.addMapping = function(id, map, callback){
  if(map < 0 || map > 11 || id < 0 || id > 11){
    callback(false);
  } else {
    mappings[id - 1].push(map);

    console.log("Mappings updated: " + JSON.stringify(mappings));

    callback(true);
  }
};

LedMapper.prototype.resetMappings = function(callback) {
  for(var i = 0; i < 11; i++){
    mappings[i] = [];
  }

  console.log("Mappings updated: " + JSON.stringify(mappings));

  callback(true);
};

LedMapper.prototype.removeMapping = function(id, map, callback){
  var index = mappings[id - 1].indexOf(map);

  mappings[id - 1].splice(index, 1);

  console.log("Mappings updated: " + JSON.stringify(mappings));

  callback();
};

module.exports = LedMapper;
