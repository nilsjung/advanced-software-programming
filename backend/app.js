/**
 * The main application file.
 * It provides the server, connects to the database and initializes the socket.io connection.
 * For testing reasons it also exports the app.
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const debug = require('debug')('backend:server');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('config');
const apiRouter = require('./routes/index');
const mongoose = require('mongoose');

const app = express();

process.env['NODE_CONFIG_DIR'] = './config';

const mongodbDatabase = process.env['MONGODB_DATABASE'] || 'chat';
const mongodbPort = process.env['MONGODB_PORT'] || 27017;
const mongodbHost = process.env['MONGODB_HOST'] || config.dbHost;

mongoose.connect(
    'mongodb://' + mongodbHost + ':' + mongodbPort + '/' + mongodbDatabase,
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;
db.once('open', function() {
    debug('succesfully loaded database');
});
db.on('error', function(err) {
    debug('DB connection error: ' + err);
});

//don't show the log when it is in test mode
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(logger('combined'));
}

/**
 * Use some middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* middleware to set the response headers.
 * Used to enable cors and allow the custom authorization-token header.
 */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, X-Custom-Authorisation'
    );
    next();
});

/**
 * define the endpoints
 */
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * Get port from environment and store in express.
 */
const port = process.env.PORT || '3000';

/**
 * initialize socket io
 */
const http = require('http').Server(app);
const socket = require('./socket/socket');
socket(http);

// run the server
http.listen(port, () => {
    console.log('server is listening on port: ', port);
});

// export for testing
module.exports = app;
