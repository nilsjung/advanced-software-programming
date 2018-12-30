/**
 * The userchat model.
 * A userchat has:
 *  @param {String} id
 *  @param {Array} users
 *  @param {Array} chats
 */

let mongoose = require('mongoose');

/**
 *
 */
var userchatSchema = new mongoose.Schema({
    id: String,
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
    users: [
        {
            name: String,
            email: String,
        },
    ],
});

module.exports = mongoose.model('Userchat', userchatSchema);
