const jwt = require('jsonwebtoken');

const sign = (mail) => {
    return new Promise((res, rej) => {
        jwt.sign({ mail: mail }, 'secret', function(err, token) {
            if (err) {
                rej(err);
            } else {
                res(token);
            }
        });
    });
};

const verify = (req) => {
    let token;

    if (req.get) {
        token = req.get('X-Custom-Authorisation');
    } else {
        token = req;
    }

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
