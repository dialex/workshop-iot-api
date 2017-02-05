let mongoose = require('mongoose');
let Message = require('../models/message');

/*
 * GET /message, returns all messages
 */
function getMessages(req, res) {
    Message.find(function(err, messages) {
        if (err)
          res.send(err);
        res.json(messages);
    });
}

/*
 * GET message/:author_name, returns all messages filtered by author
 */
function getMessagesByAuthor(req, res) {
    Message.find({ author: req.params.author_name }, function(err, message) {
        if (err)
          res.send(err);
        res.json(message);
    });
}

/*
 * POST /message, saves a new message
 */
function postMessage(req, res) {
    var message = new Message();
    message.text = req.body.text;
    message.author = req.body.author;

    message.save(function(err) {
        if (err)
          res.send(err);
        res.json({ result: 'Message saved' });
    });
}

/*
 * DELETE /message, deletes all messages
 */
function deleteMessages(req, res) {
    Message.remove({}, function(err, bear) {
        if (err)
          res.send(err);
        res.json({ message: 'Messages deleted' });
    });
}

//export all the functions
module.exports = { getMessages, postMessage, deleteMessages, getMessagesByAuthor };
