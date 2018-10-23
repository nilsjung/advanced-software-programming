var createError = require('http-errors');
var express = require('express');
var path = require('path');
var debug = require('debug')('backend:server');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let config = require('config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');
var mongoose = require('mongoose');

var app = express();

process.env['NODE_CONFIG_DIR'] = './config';

mongoose.connect(config.dbHost, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', function() {
    debug('succesfully loaded database');
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//don't show the log when it is in test mode
if(config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(logger('combined'));
}

/**
 * Use some middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * define your endpoints
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

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

var port = process.env.PORT || '3000';

var io = require('socket.io').listen(app.listen(port));

var userId = 0;
var connections = [];

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    userId += 1;
    socket.emit('start', {userId} );
    socket.on('message', (data) => {
        connections.forEach( (connectedSocket) => {
            if (connectedSocket !== socket) {
                connectedSocket.emit('message', data);
            }
        });
    });

    socket.on('disconnect', () => {
        const index = connections.indexOf(socket);
        connections.splice(index, 1);
    });
});