const mongoose = require('mongoose');
const MessageSchema = require('./message').schema;
const ChatUserSchema = require('./chatUser').schema;

/**
 * The chatroom schema to store conversations between members
 * **Chatroom**
 *  * name _string_
 *  * chats _Array_
 *  * users _Array_
 */
const chatroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chats: [MessageSchema],
    users: [ChatUserSchema],
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
