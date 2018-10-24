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

const express = require('express');
const router = express.Router();

const User = require('../model/user');

const defined = require('../mixins/helper');

/**
 * GET /users
 */
router.get('/', (req, res) => {
    User.find({}, (err, users) => {

        if (err) {
            res.end(err);
        }

        res.contentType('application/json');
        res.json(users);
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

/**
 * POST /users
 */
router.post('/', (req, res) => {

    var registerEmail = req.body.email;

    User.findOne({email: registerEmail}, (err, user) => {

        const {firstname, lastname, email, password} = req.body;
        const dataComplete = defined(firstname) && defined(lastname)  && defined(email) && defined(password);

        if (!dataComplete) {
            res.json({message: 'data not complete'});
            return;
        }

        if (user) {
            res.json({ message: 'email already in use' });
            return ;
        }

        const newUser = new User(req.body);
        newUser.save((err, user) => {
            return user;
        });

        res.json({ message: 'user created', user: newUser });
    });
});

/**
 * DELETE /users
 */
router.delete('/', (req, res) => {

    User.remove({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'deleted all users', user: result});
        }
    });
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndRemove({'_id': id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'deleted user with id' + id, result});
        }

    });
});

module.exports = router;
