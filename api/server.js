// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var app        = express();                 // define our app using express

// connect to our database
mongoose.connect('mongodb://localhost/apiDatabase');
var message = require('./models/message');

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('API was called.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Hello world! This is the API for the IoT Workshop.' });
});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);                    // all routes are prefixed with this


// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('🌈  Magic happens on port ' + port);
