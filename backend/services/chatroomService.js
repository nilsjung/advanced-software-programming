const Chatroom = require('../model/chatroom');
const Userchat = require('../model/userchat');

/**
 * The storeMessageToChatroom service stores the recieved message to the database.
 *
 * @param {Object} message the message object
 * @param {Object} user the user object
 * @param {Object} chatroom the chatroom name
 * @return  The promise object encapsulates the database operation to store the message
 * * <resolve> the updated chatroom object
 * * <reject> database error
 */
const storeMessageToChatroom = (message, user, chatroom) => {
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
