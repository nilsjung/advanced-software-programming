const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');

const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(sock) {
        userId += 1;
        sock.emit('start', { userId });

        sock.on('message', async (data) => {
            messageService(data, sock);
        });

        sock.on('onlinestatus', (user, onlinestatus) => {
            // check if user is new
            if (
                connections.find((e) => e.user && e.user._id === user._id) ===
                undefined
            ) {
                connections.push({
                    user: user,
                    onlinestatus: onlinestatus,
                });
            }
            // user is existing
            else {
                connections = connections.map((connection) => {
                    if (connection.user && connection.user._id === user._id) {
                        onlineStatusService(sock, user._id, onlinestatus);
                        return {
                            ...connection,
                            onlinestatus: onlinestatus,
                        };
                    }
                    return connection;
                });
            }
        });

        sock.on('onlinestatusAll', () => {
            sock.emit('onlinestatusAll', connections);
        });

        sock.on('joinChatroom', (data) => {
            if (sock.room) {
                sock.leave(sock.room);
            }
            sock.room = data.chatroom;
            sock.join(data.chatroom);
        });

        sock.on('disconnect', (user) => {
            // TODO remove user from connections
        });
    });

    return io;
};

module.exports = socket;
