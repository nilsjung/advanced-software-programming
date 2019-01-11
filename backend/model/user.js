let mongoose = require('mongoose');

/**
 * The user schema to store informations about the member
 *
 * **User**
 *  * firstname _String_
 *  * lastname _String_
 *  * email _String_
 *  * password _String_
 *  * nickname _String_
 */
var userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nickname: { type: String },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
