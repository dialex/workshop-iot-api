var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  author: String,
  text: String
});

MessageSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj._id
  delete obj.__v
  return obj
}

module.exports = mongoose.model('Message', MessageSchema);
