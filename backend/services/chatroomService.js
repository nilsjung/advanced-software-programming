const Chatroom = require('../model/chatroom');
const Userchat = require('../model/userchat');

const storeMessageToChatroom = (message, user, chatroom) => {
    console.log(message);
    return new Promise((resolve, reject) => {
        Chatroom.findOne({ name: chatroom }, (err, result) => {
            if (err) reject(err);
            if (result) {
                const chat = {
                    user: user,
                    text: message.text,
                    timestamp: message.timestamp,
                };
                result.chats.push(chat);
                result.save(function(err, updatedChatroom) {
                    if (err) reject(err);
                    resolve(updatedChatroom);
                });
            } else {
                Userchat.findOne({ id: chatroom }, (err, result) => {
                    if (err) reject(err);
                    if (result) {
                        const chat = {
                            user: user,
                            text: message.text,
                            timestamp: message.timestamp,
                        };
                        result.chats.push(chat);
                        result.save(function(err, updatedChatroom) {
                            if (err) reject(err);
                            resolve(updatedChatroom);
                        });
                    }
                });
            }
        });
    });
};

module.exports = { storeMessageToChatroom };
