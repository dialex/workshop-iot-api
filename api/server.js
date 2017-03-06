// ============================================================================
// BASE SETUP
// ============================================================================

// call the packages we need
var bodyParser = require('body-parser');
var config = require('config');
var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var morgan = require('morgan');
var secrets = require('./config/secrets');
var app = express(); // define our app using express
let port = process.env.PORT || 8080;

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'));
    //app.use(morgan('combined')); //uncomment for verbose console logging
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// ============================================================================
// DATABASE SETUP
// ============================================================================

let options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
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
router.route('/admin/message')
    .get(message.getLatestMessages)

// PROTECTED ROUTES below
// ============================================================================

// middleware (useful for logging and validations)
router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secrets.tokenSalt, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Invalid authentication token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next(); //continue to routes
            }
        });
    } else if (req.headers.authorization == 'Basic dGVzdGJhc2g6YnJpZ2h0b24xNw==') {
        next(); //continue to routes
    } else {
        return res.status(403).json({
            success: false,
            message: 'Missing authentication header or token.'
        });
    }
});

router.route('/message')
    .get(message.getMessages)
    .post(message.postMessage)
    .delete(message.deleteMessages);
router.route('/message/:author_name')
    .get(message.getMessagesByAuthor)

// register routes and prefix all them
app.use('/api', router);
// routes for the static pages (front-end)
app.use('/ui', express.static('../api-frontend'))

// http://stackoverflow.com/a/35367521/675577
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ============================================================================
// START THE SERVER
// ============================================================================
app.listen(port);
console.log('🌈  Magic happens at http://localhost:' + port);

// expose app for testing purposes
module.exports = app;
