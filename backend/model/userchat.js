let mongoose = require('mongoose');

/**
 * The userchat schema to store a conversation between just two user.
 *
 *  **Userchat**
 *  * id _string_
 *  * users _Array_ of user
 *  * chats _Array_ of chat
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
