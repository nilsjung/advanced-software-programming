const jwt = require('jsonwebtoken');

/**
 * store all valid token for session use
 * @param {Object} token all the token as key that are known to the server. as value the related user is stored
 * @param {function} getUserByToken return the user to a given token
 * @param {function} addNewToken stores a token with related user to the token-object
 */
const validToken = {
    token: {},
    getUserByToken: function(t) {
        return this.token[t];
    },

    addNewToken: function(token, user) {
        this.token[token] = user;
    },
};

const sign = (user) => {
    return new Promise((res, rej) => {
        jwt.sign({ email: user.email }, 'secret', function(err, token) {
            if (err) {
                rej(err);
            } else {
                validToken.addNewToken(token, user);
                res(token);
            }
        });
    });
};

const verify = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                rej(err);
            } else {
                res(decoded);
            }
        });
    });
};

module.exports = { sign, verify, validToken };
