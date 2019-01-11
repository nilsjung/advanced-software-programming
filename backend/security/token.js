/**
 * Operations to generate and decrypt the jwt.
 * @date 2018/12
 * @author Jule Martensen
 */

const jwt = require('jsonwebtoken');

/**
 * generates a jwt to the given user
 * @param {String} email the email to use as key for the jwt.
 * @returns Promise
 * * {resolve} the generated token
 * * {reject} token generation error
 */
const sign = (email) => {
    return new Promise((res, rej) => {
        jwt.sign({ email: email }, 'secret', function(err, token) {
            if (err) {
                rej(err);
            } else {
                res(token);
            }
        });
    });
};

/**
 * verifies the email stored in the jwt.
 * @param {String} token
 * @returns Promise
 * * {resolve} the saved email wihtin the token
 * * {reject} the verification error
 */
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

module.exports = { sign, verify };
