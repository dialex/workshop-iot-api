let mongoose = require('mongoose');
let Message = require('../models/message');

/*
 * GET /message, returns all messages
 */
function getMessages(req, res) {
    console.log('GET /message');
    Message.find(function(err, messages) {
        if (err)
          res.send(err);
        console.log('\tReturned all saved messages');
        res.json(messages);
    });
}

/*
 * GET message/:author_name, returns all messages filtered by author
 */
function getMessagesByAuthor(req, res) {
    console.log('GET /message/{author_name}');
    Message.find({ author: req.params.author_name }, function(err, message) {
        if (err)
          res.send(err);
        res.json(message);
        console.log('\tReturned messages of: ' + req.params.author_name);
    });
}

/*
 * POST /message, saves a new message
 */
function postMessage(req, res) {
    console.log('POST /message');
    var message = new Message();
    message.text = req.body.text;
    message.author = req.body.author;

    message.save(function(err) {
        if (err)
          res.send(err);
        res.json({ result: 'Message saved' });
        console.log('\tMessage saved');
    });
}

/*
 * DELETE /message, deletes all messages
 */
function deleteMessages(req, res) {
    console.log('DELETE /message');
    Message.remove({}, function(err, bear) {
        if (err)
          res.send(err);
        res.json({ message: 'Messages deleted' });
        console.log('\tMessages deleted');
    });
}

//export all the functions
module.exports = { getMessages, postMessage, deleteMessages, getMessagesByAuthor };
