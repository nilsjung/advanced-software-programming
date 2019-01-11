const token = require('./../security/token');
const chatroomService = require('./../services/chatroomService');

/**
 * The messageService handles the 'message' events.
 * @param {Object} data the object containing the messages, the user, the jwt, and the current chatroom to store the message at.
 * @param {Object} socket the socket-io object
 */
const messageService = async (data, socket) => {
    const user = await token.verify(data.token);
    const chatroom = data.chatroom;

    //store current message to the database
    chatroomService
        .storeMessageToChatroom(data.message, data.user, chatroom)
        .then((result) => {})
        .catch((err) => console.warn(err));
    // inform the clients about the recieved message. send them just to the namespace 'chatroom'
    socket.to(chatroom).emit('message', {
        message: data.message,
        user: data.user,
    });
};

module.exports = messageService;
