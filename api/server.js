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
let root = require('./controllers/routes/root');
let port = 8080;

//db options
let options =
{
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

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
var router = express.Router();

// middleware (useful for logging and validations)
router.use(function(req, res, next) {
    next(); // continue to the routes
});

router.route('/')
    .get(root.get)

router.route('/status')
    .get(status.getStatus);

router.route('/message')
    .get(message.getMessages)
    .post(message.postMessage)
    .delete(message.deleteMessages);

router.route('/message/:author_name')
    .get(message.getMessagesByAuthor)

// register routes, and prefix all them
app.use('/api', router);


// START THE SERVER
// =============================================================================
port = process.env.PORT || port;            // set our port
app.listen(port);
console.log('🌈  Magic happens on port ' + port);

// expose app for testing purposes
module.exports = app;
