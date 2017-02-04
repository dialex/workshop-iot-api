// ============================================================================
// BASE SETUP
// ============================================================================

// call the packages we need
var bodyParser = require('body-parser');
var config     = require('config');         // we load configs from JSON files
var express    = require('express');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var app        = express();                 // define our app using express
let port       = process.env.PORT || 8080;

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'));
    //app.use(morgan('combined')); //uncomment for verbose console logging
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ============================================================================
// DATABASE SETUP
// ============================================================================

let options =
{
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

// connect
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// ============================================================================
// ROUTES SETUP
// ============================================================================
let router = express.Router();

// middleware (useful for logging and validations)
router.use(function(req, res, next) {
    next(); // continue to the routes
});

// declare routes
let root = require('./controllers/root');
let auth = require('./controllers/auth');
let status = require('./controllers/status');
let message = require('./controllers/message');

router.route('/')
    .get(root.get)

router.route('/status')
    .get(status.getStatus);

router.route('/auth')
    .post(auth.authenticate);

router.route('/message')
    .get(message.getMessages)
    .post(message.postMessage)
    .delete(message.deleteMessages);

router.route('/message/:author_name')
    .get(message.getMessagesByAuthor)

// register routes, and prefix all them
app.use('/api', router);

// ============================================================================
// START THE SERVER
// ============================================================================
app.listen(port);
console.log('🌈  Magic happens at http://localhost:' + port);

// expose app for testing purposes
module.exports = app;
