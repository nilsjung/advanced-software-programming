const jwt = require('jsonwebtoken');

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
