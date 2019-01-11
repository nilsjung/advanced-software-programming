/**
 * The chatroom model.
 * A chatroom has:
 *  @param {String} name
 *  @param {Array} chats
 */

const mongoose = require('mongoose');
const MessageSchema = require('./message').schema;
const ChatUserSchema = require('./chatUser').schema;

const chatroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chats: [MessageSchema],
    users: [ChatUserSchema],
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
