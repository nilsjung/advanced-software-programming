const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');
const validToken = require('./../security/token').validToken;

const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(sock) {
        const token = sock.request._query['token'];
        let user = null;
        if (token) {
            user = validToken.getUserByToken(token);
        }

        connections.push(sock);
        sock.emit('start', { user });

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
