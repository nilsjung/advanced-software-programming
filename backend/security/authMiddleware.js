const verify = require('./token').verify;

/**
 * The authentification middleware.
 * After adding the middleware to the api-router,
 * the authenticated user can be accessed via req.decoder.
 *
 * Adding middleware like: `router.post('/', auth, (req, res) => { some protected rest-api here }`
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const authenticationMiddleware = (req, res, next) => {
    const token = req.get('X-Custom-Authorisation');

    if (token) {
        verify(token)
            .then((result) => {
                req.decoded = result;
                next();
            })
            .catch(() => {
                res.status(403).josn({
                    success: false,
                    message: 'Not authorized',
                });
            });
    }
};

module.exports = authenticationMiddleware;
