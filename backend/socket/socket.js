const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');

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

        sock.on('onlinestatus', (userid, onlinestatus) =>
            onlineStatusService(socket, userid, onlinestatus)
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

const messageService = (sock, data) => {
    const chatroom = data.chatroom;
    //store message to chat
    chatroomService
        .storeMessageToChatroom(data.message, data.user, chatroom)
        .then((result) => {})
        .catch((err) => console.warn(err));
    sock.to(chatroom).emit('message', {
        message: data.message,
        user: data.user,
    });
};

const disconnectService = (connections) => {
    const index = connections.indexOf(socket);
    connections.splice(index, 1);
};

module.exports = socket;
