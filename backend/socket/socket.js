const User = require('../model/user');

const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
        connections.push(socket);
        userId += 1;
        socket.emit('start', { userId });
        socket.on('message', (data) => {
            connections.forEach((connectedSocket) => {
                if (connectedSocket !== socket) {
                    connectedSocket.emit('message', data);
                }
            });
        });

        socket.on('get-user-status', (userid) => {
            User.findById(userid, (err, user) => {
                if (err) {
                    socket.emit('set-user-status', err);
                } else {
                    socket.emit('set-user-status', user.onlinestatus);
                }
            });
        });

        socket.on('disconnect', () => {
            const index = connections.indexOf(socket);
            connections.splice(index, 1);
        });
    });

    return io;
};

module.exports = socket;
