/**
 * The _User Routes_ to enable operations on the mongoose `User` model
 *
 * **Methods**
 * * GET /user
 * * GET /user/:id
 * * POST /user
 * * PUT /user/:id
 * * DELETE /user
 * * DELETE /user/:id
 */

const token = require('../security/token');
const express = require('express');
const router = express.Router();
const auth = require('../security/authMiddleware');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../model/user');
const defined = require('../mixins/helper');

/**
 * `POST /api/user/login`
 * expects a email and a password as payload.
 * looks up the user in the database.
 * on success the user and the generated jwt will be returned to the client.
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
            if (!bcrypt.compareSync(password, user.password)) {
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
 * `POST /api/user/logout`
 * expects nothing.
 * should remove the token
 */
router.post('/logout', (req, res) => {
    // req.session.destroy();
    res.status(200).json({ message: 'successfully logged out' });
});

/**
 * `GET /api/user/`
 * on success it returns all stored users to the client
 */
router.get('/', auth, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(401).send(err);
        }

        res.json(users);
    });
});

/**
 * `GET /api/user/:id`
 * on success it returns the stored user with id _:id_
 */
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
 * `POST /api/user/`
 * expects the email, firstname, lastname and password as payload
 * **on success** it creates a new user for registration
 */
router.post('/', (req, res) => {
    let registerEmail = req.body.email;

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
        req.body.password = bcrypt.hashSync(password);
        const newUser = new User(req.body);

        newUser.save((err, user) => {
            res.status(200).json({ message: 'user created', user: user });
        });
    });
});

/**
 * `POST /api/user/:id`
 * expects firstname, lastname, email, password as payload
 * _(optionals are avatar and nickname)_
 * on success it updates a given user with the payload information
 */
router.post('/:id', auth, (req, res) => {
    const userId = req.params.id;

    /**
     * local function to update the user information.
     * if neccessary extract in a helper-function beneath `./mixins/helper.js`
     *
     * @param {string} key the key to store the value at.
     * @param {string} field the value to store
     * @param {Object} model the mongoose model to store the information at.
     */
    const updateField = (key, field, model) => {
        if (defined(field)) {
            if (field != model[field]) {
                model.set({ [key]: field });
            }
        }
    };

    User.findById(userId, (err, user) => {
        if (err) {
            res.status(301).json({
                message: 'an error occured while loading user',
            });
            return;
        }

        const {
            firstname,
            lastname,
            email,
            password,
            nickname,
            avatar,
        } = req.body;

        updateField('firstname', firstname, user);
        updateField('lastname', lastname, user);
        updateField('email', email, user);
        updateField('password', password, user);

        user.save((err, updatedUser) => {
            res.status(200).json({
                message: 'successfully updated',
                user: updatedUser,
            });
        });
    });
});

/**
 * `DELETE /api/user`
 * on success it removes all stored user in the database
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
 * `DELETE /api/user/:id`
 * on success it removes the user with the given id `:id`
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
