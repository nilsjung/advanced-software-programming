/**
 * The onlinestatusService handles the socket events for 'onlinestatus'.
 *
 * @param {Object} socket the socket-io object
 * @param {Object} user the user that changes the online status
 * @param {string} onlinestatus the changed online status
 */
const onlineStatusService = async (socket, user, onlinestatus) => {
    socket.broadcast.emit('onlinestatus', { user, onlinestatus });
};

module.exports = onlineStatusService;
