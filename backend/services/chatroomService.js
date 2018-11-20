const Chatroom = require('../model/chatroom');

storeMessageToChatroom = (message, user,  chatroom) => {
    return new Promise((resolve, reject) => {
        Chatroom.findOne({name: chatroom}, (err, result) => {
            if (err) reject(err);
            if(result) {
                console.log(message)
                const chat = {user, text: message.text, timestamp: message.timestamp};
                result.chats.push(chat);
                result.save(function (err, updatedChatroom) {
                    if (err) reject(err);
                    resolve(updatedChatroom);
                    });
                }
            });
        });
}

module.exports = {storeMessageToChatroom};