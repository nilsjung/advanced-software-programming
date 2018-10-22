/**
 * The user model.
 * A user has:
 *  @param {String} firstname
 *  @param {String} lastname
 *  @param {String} email
 *  @param {Number} age
 */

let mongoose = require('mongoose');

/**
 *
 */
var userSchema =  new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    nickname: {type: String},
    email: {type: String, required: true, unique: true},
    age: Number,
});

let User = mongoose.model('User', userSchema);

module.exports = User;