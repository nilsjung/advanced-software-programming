let mongoose = require('mongoose');

/**
 * A Message to store in a chat
 *
 * **Message**
 * * user _Object_
 * * text _String_
 * * timestamp _date_
 */
const MessageSchema = new mongoose.Schema({
    user: {
        name: String,
        email: String,
    },
    text: String,
    timestamp: Date,
});

module.exports = mongoose.model('Message', MessageSchema);
