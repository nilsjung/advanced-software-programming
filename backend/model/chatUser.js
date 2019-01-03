let mongoose = require('mongoose');

/**
 * A ChatUser
 */
const ChatUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
});

module.exports = mongoose.model('ChatUser', ChatUserSchema);
