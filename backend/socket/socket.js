const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');

const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(socket) {
        connections.push(socket);
        userId += 1;
        socket.emit('start', { userId });
        socket.on('message', (data) => messageService(data, socket));
        socket.on('onlinestatus', (userid, onlinestatus) =>
            onlineStatusService(socket, userid, onlinestatus)
        );
        socket.on('disconnect', () => disconnectService(connections));
    });

    return io;
};

const disconnectService = (connections) => {
    const index = connections.indexOf(socket);
    connections.splice(index, 1);
};

module.exports = socket;
