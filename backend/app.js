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

mongoose.connect(
    config.dbHost,
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;
db.once('open', function() {
    debug('succesfully loaded database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

// Disable CORS
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
 * define your endpoints
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
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';

const http = require('http').Server(app);
const socket = require('./socket/socket');
socket(http);

http.listen(port, () => {
    console.log('server is listening on port: ', port);
});

// export for testing
module.exports = app;
