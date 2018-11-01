/**
 * The user model.
 * A user has:
 *  @param {String} firstname
 *  @param {String} lastname
 *  @param {String} email
 *  @param {String} password
 */

let mongoose = require('mongoose');

/**
 *
 */
var userSchema =  new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    nickname: {type: String},
    email: {type: String, lowercase: true,required: true, unique: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);