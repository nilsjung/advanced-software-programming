const onlineStatusService = async (socket, user, onlinestatus) => {
    socket.broadcast.emit('onlinestatus', { user, onlinestatus });
};

module.exports = onlineStatusService;
