let mongoose = require('mongoose');

/**
 * A Message
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
