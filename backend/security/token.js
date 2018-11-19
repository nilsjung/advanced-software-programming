const jwt = require('jsonwebtoken');

sign = (mail) => {
    return new Promise((res, rej) => {
        jwt.sign({ mail: mail }, 'secret', function(err, token) {
            if(err) {
                rej(err);
;            }
            else {
                res(token);
            }
        });
    });
};

verify = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, 'secret', function(err, decoded) {
            if(err) {
                rej(err);
            }
            else {
                res(decoded);
            }
        });
    });
};

module.exports = {sign, verify};