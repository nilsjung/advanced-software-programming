const messageService = require('./messages');
const onlineStatusService = require('./onlinestatus');

const socket = (server) => {
    let userId = 0;

    const io = require('socket.io')(server);

    io.set('origins', 'localhost:*');

    io.sockets.on('connection', function(sock) {
        userId += 1;
        sock.emit('start', { userId });

        sock.on('message', async (data) => {
            messageService(data, sock);
        });

        sock.on('onlinestatus', (userid, onlinestatus) => {
            userStatus.updateUserStatusById(userid._id, onlinestatus);
            onlineStatusService(sock, userid._id, onlinestatus);
        });

        sock.on('joinChatroom', (data) => {
            if (sock.room) {
                sock.leave(sock.room);
            }
            sock.room = data.chatroom;
            sock.join(data.chatroom);
        });

        sock.on('disconnect', () => {
            userStatus.setUserOffline();
            const currentUser = userStatus.getUser();
            onlineStatusService(sock, currentUser.id, currentUser.status);
        });
    });

    return io;
};

/**
 * keep track of all user status
 * @param {Object} users all the users as key with their corresponding online status
 * @param {function} getUser get current connected user
 * @param {function} getUserStatusById return the onlinestatus to a given user
 * @param {function} updateUserStatusById stores a status and socket with related user to the users-object
 * @param {function} setUserOffline set status of current connected user to offline
 */
const userStatus = {
    users: {},
    getAll: function() {
        return this.users;
    },
    getUser: function() {
        return this.users[socket.id];
    },
    getUserStatusById: function(id) {
        return this.users[socket.id].status;
    },
    updateUserStatusById: function(id, onlinestatus) {
        this.users[socket.id] = {
            id: id,
            status: onlinestatus,
        };
    },
    setUserOffline: function() {
        this.users[socket.id] = {
            ...this.users[socket.id],
            status: 'offline',
        };
    },
};

module.exports = socket;
