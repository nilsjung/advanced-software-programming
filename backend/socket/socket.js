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
            userStatus.updateUserStatusById(sock, userid._id, onlinestatus);
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
            userStatus.setUserOffline(sock);
            const currentUser = userStatus.getUser(sock);
            onlineStatusService(sock, currentUser._id, currentUser.status);
        });

        sock.on('getUsersStatus', () => {
            console.log('getUsersStatus', userStatus.getAll());
            sock.emit('getUsersStatus', userStatus.getAll());
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
    getUser: function(sock) {
        return this.users[sock.id];
    },
    getUserStatusById: function(sock, id) {
        return this.users[sock.id].status;
    },
    updateUserStatusById: function(sock, id, onlinestatus) {
        // to do: add only, when _id is not already exisiting
        this.users[sock.id] = {
            _id: id,
            onlinestatus: onlinestatus,
        };
        console.log(socket.id);
    },
    setUserOffline: function(sock) {
        this.users[sock.id] = {
            ...this.users[sock.id],
            onlinestatus: 'offline',
        };
    },
};

module.exports = socket;
