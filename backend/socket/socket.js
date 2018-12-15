const token = require('./../security/token');
const chatroomService = require('./../services/chatroomService');

const socket = (server) => {
    let userId = 0;
    let connections = [];

    const io = require('socket.io')(server);

    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(sock) {
        connections.push(sock);
        userId += 1;
        sock.emit('start', { userId });

        sock.on('message', async (data) => {
            const user = await token.verify(data.token);
            messageService(sock, data, connections);
        });

        sock.on('disconnect', () => disconnectService(connections));
    });

    return io;
};

const messageService = (sock, data, connections) => {
    const chatroom = data.chatroom;
    console.log(connections.length);
    //store message to chat
    chatroomService
        .storeMessageToChatroom(data.message, data.user, chatroom)
        .then((result) => {})
        .catch((err) => console.warn(err));
    sock.broadcast.emit('message', {
        message: data.message,
        user: data.user,
    });
};

const disconnectService = (connections) => {
    const index = connections.indexOf(socket);
    connections.splice(index, 1);
    console.log(connections.length);
};

module.exports = socket;
