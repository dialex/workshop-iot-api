// BASE SETUP
// =============================================================================

// call the packages we need
var bodyParser = require('body-parser');
var config     = require('config');         //we load configs from JSON files
var express    = require('express');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var app        = express();                 // define our app using express

// declare routes
let status = require('./controllers/routes/status');
let message = require('./controllers/routes/message');
let port = 8080;

//db options
let options =
{
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
var Message = require('./models/message');

// connect to db
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') === 'dev') {
    //app.use(morgan('combined')); //uncomment for verbose console logging
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));


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
    .get(status.getStatus);

router.route('/message')
    .get(message.getMessages)
    .post(message.postMessage)
    .delete(message.deleteMessages);

// on routes that end in /messages/...
// ----------------------------------------------------
router.route('/messages/:author_name')
    // get the message with that id (accessed at GET http://localhost:8080/api/messages/:author_name)
    .get(function(req, res) {
      console.log('GET /messages/{author_name}');
        Message.find({ author: req.params.author_name }, function(err, message) {
            if (err)
              res.send(err);
            res.json(message);
            console.log('\tReturned messages of: ' + req.params.author_name);
        });
    });

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);                    // all routes are prefixed with this


// START THE SERVER
// =============================================================================
port = process.env.PORT || port;            // set our port
app.listen(port);
console.log('🌈  Magic happens on port ' + port);

// expose app for testing purposes
module.exports = app;
