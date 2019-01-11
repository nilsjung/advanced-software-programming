let mongoose = require('mongoose');

/**
 * A ChatUser as implementation for userinformation within a Chat
 *
 * **ChatUser**
 * * name _string_
 * * email _string_
 * * role _string_
 */
const ChatUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
});

module.exports = mongoose.model('ChatUser', ChatUserSchema);
