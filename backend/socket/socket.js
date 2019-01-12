/**
 * main socketio file
 * exports the socket
 *
 * @date 2018/11
 * @author nils jung
 */
const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');

/**
 *
 * @param {Object} server the http-server to bind the socket-io object
 * @returns {Object} the socket-io instance
 */
const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    // allow cors
    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(sock) {
        connections.push(sock);
        userId += 1; // TODO remove this unused user-id handling
        sock.emit('start', { userId });

        /**
         * register the socket events.
         *  - change onlinestatus
         *  - handle message
         *  - join a chatroom
         *  - disconnect from application
         */
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

/**
 * The disconnectService handles the disconnection on an ${disconnect} event.
 * @param {Array} connections the current registered connections at the server
 */
const disconnectService = (connections) => {
    const index = connections.indexOf(socket);
    connections.splice(index, 1);
};

module.exports = socket;
