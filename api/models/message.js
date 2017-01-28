var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    timestamp: Date,
    author: String,
    text: String
});

module.exports = mongoose.model('Message', MessageSchema);
