/**
 * User Route
 *
 * Methods:
 * GET /users
 * GET /users/:id
 * POST /users
 * PUT /users/:id
 * DELETE /users
 * DELETE /users/:id
 */

const token = require('../security/token');
const express = require('express');
const router = express.Router();
const auth = require('../security/authMiddleware');

const User = require('../model/user');
const defined = require('../mixins/helper');

/**
 * Login /user
 */
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({ error: 'missing data' });
        return;
    }

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.json({ error: err });
            return;
        } else if (user) {
            if (password !== user.password) {
                res.status(403).json({
                    message: 'invalid password',
                    user: null,
                });
            } else {
                // create token
                token
                    .sign(email)
                    .then((result) => {
                        res.status(200).json({
                            message: 'successfully logged in',
                            user: user,
                            token: result,
                        });
                    })
                    .catch((err) => {
                        res.status(200).json({
                            message:
                                'successfully logged in without access token',
                            user: user,
                        });
                    });
                return;
            }
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    });
});

/**
 * Logout /user
 */
router.post('/logout', (req, res) => {
    // req.session.destroy();
    res.status(200).json({ message: 'successfully logged out' });
});

/**
 * GET /users
 */
router.get('/', auth, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(401).send(err);
        }

        res.json(users);
    });
});

router.get('/:id', auth, (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

/**
 * Create a user at registration
 * POST /user
 */
router.post('/', (req, res) => {
    var registerEmail = req.body.email;

    User.findOne({ email: registerEmail }, (err, user) => {
        const { firstname, lastname, email, password } = req.body;
        const dataComplete =
            defined(firstname) &&
            defined(lastname) &&
            defined(email) &&
            defined(password);

        if (!dataComplete) {
            res.status(400).json({ message: 'data not complete' });
            return;
        }

        if (user) {
            res.json({ message: 'email already in use', user: user });
            return;
        }

        const newUser = new User(req.body);
        newUser.save((err, user) => {
            res.status(200).json({ message: 'user created', user: user });
        });
    });
});

/**
 * DELETE /users
 */
router.delete('/', auth, (req, res) => {
    User.deleteMany({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'deleted all users', user: result });
        }
    });
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', auth, (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove({ _id: id }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'deleted user with id' + id, result });
        }
    });
});

module.exports = router;
