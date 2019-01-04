const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');

const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(sock) {
        const token = sock.request._query['token'];
        if (token) {
            console.log(token);
        }

        connections.push(sock);
        userId += 1;
        sock.emit('start', { userId });

        sock.on('message', async (data) => {
            messageService(data, sock);
        });

        sock.on('onlinestatus', (userid, onlinestatus) =>
            onlineStatusService(sock, userid, onlinestatus)
        );

        sock.on('joinChatroom', (data) => {
            if (sock.room) {
                sock.leave(sock.room);
            }
            sock.room = data.chatroom;
            sock.join(data.chatroom);
        });

        sock.on('disconnect', () => disconnectService(connections));
    });

    return io;
};

const disconnectService = (connections) => {
    const index = connections.indexOf(socket);
    connections.splice(index, 1);
};

module.exports = socket;
