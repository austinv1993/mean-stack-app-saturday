// EXPRESS CONFIGURATION FILE

// node libraries and configuration file
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    morgan = require('morgan'),
    config = require('./config');


module.exports = function () {

    // let's create an Express app
    var app = express();


    // MIDDLEWARE NEEDED BOTH FOR DEV AND PRODUCTION

    // fixes cross-origin issues
    app.use(cors());

    // creates and populates the req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(
        {
            extended: true
        }));

    // makes sure we can use PUT and PATCH
    app.use(methodOverride());

    // cookies and session
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));


    // MIDDLEWARE THAT RUNS ONLY IN DEVELOPMENT

    // a logger so we can see what's going on
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }


    // HERE WE INCLUDE THE ROUTES
    require('../features/friends/friend.server.routes')(app);


    // THIS WILL BE THE CLIENT-SIDE, ANGULAR APP
    // the route is relative to the root of the project
    // needs to come after setting the rendering engine
    app.use(express.static('./core/client'));


    return app;
};