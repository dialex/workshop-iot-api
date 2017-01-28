// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app        = express();                 // define our app using express

// connect to our database
mongoose.connect('mongodb://localhost/apiDatabase');
var Message = require('./models/message');

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of express Router

// middleware (useful for logging and validations)
router.use(function(req, res, next) {
    next(); // continue to the routes
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ result: 'Hello world! This is the API for the IoT Workshop.' });
});

router.route('/status')
    // get status of API (accessed at GET http://localhost:8080/api/status)
    .get(function(req, res) {
        console.log('GET /status');
        res.json({ status: 'Alive' });
    })

router.route('/messages')
    // get all messages (accessed at GET http://localhost:8080/api/messages)
    .get(function(req, res) {
        console.log('GET /messages');
        Message.find(function(err, messages) {
            if (err)
              res.send(err);
            console.log('\tReturned all saved messages');
            res.json(messages);
        });
    })
    // create a message (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        console.log('POST /messages');
        var message = new Message();
        message.text = req.body.text;
        message.author = req.body.author;

        message.save(function(err) {
            if (err)
              res.send(err);
            res.json({ result: 'Message saved' });
            console.log('\tMessage saved');
        });
    });

router.route('/messages/:author_name')
    // get the message with that id (accessed at GET http://localhost:8080/api/messages/:author_name)
    .get(function(req, res) {
      console.log('GET /messages/{author_name}');
        Message.find({ author: req.params.author_name }, function(err, message) {
            if (err)
              res.send(err);
            res.json(message);
            console.log('\tReturned all messages of: ' + req.params.author_name);
        });
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);                    // all routes are prefixed with this


// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('🌈  Magic happens on port ' + port);
