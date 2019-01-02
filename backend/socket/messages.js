const token = require('./../security/token');
const chatroomService = require('./../services/chatroomService');

const messageService = async (data, socket) => {
    const user = await token.verify(data.token);
    const chatroom = data.chatroom;

    //store message to chat
    chatroomService
        .storeMessageToChatroom(data.message, data.user, chatroom)
        .then((result) => {})
        .catch((err) => console.warn(err));

    socket.emit.broadcast('message', {
        message: data.message,
        user: data.user,
    });
};

module.exports = messageService;
