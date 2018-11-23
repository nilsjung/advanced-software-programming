/**
 * The chatroom model.
 * A chatroom has:
 *  @param {String} name
 *  @param {Array} chats
 */

let mongoose = require('mongoose');

/**
 *
 */
var chatroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chats: [
        {
            user: {
                name: String,
                email: String,
            },
            text: String,
            timestamp: Date,
        },
    ],
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
