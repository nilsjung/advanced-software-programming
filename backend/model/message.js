/**
 * The user model.
 * A user has:
 *  @param {String} timestamp
 *  @param {String} content
 *  @param {ObjectId} authorid
 *
 *
 */

let mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 *
 */
var messageSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now, required: true},
    lastname: {type: String, required: true},
    author: {type: ObjectId, required: true, unique: true},
});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;