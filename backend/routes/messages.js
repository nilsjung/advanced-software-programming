/**
 * Message Route
 */

var express = require('express');
var router = express.Router();

var Message = require('../model').Message;

/**
 * GET /users
 */
router.get('/', (req, res) => {
    Message.find({}, (err, messages) => {

        if (err) {
            res.end(err);
        }

        res.contentType('application/json');
        res.json(messages || {});
    });
});

router.get('/:id', (req, res) => {
    Message.findById(req.params.id, (err, messages) => {
        if (err) {
            res.send(err);
        } else {
            res.json(messages);
        }
    });
});

/**
 * POST /users
 */
router.post('/', (req, res) => {

    var currentMessage = new Message(req.body);

    currentMessage.save((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'user created', result});
        }
    });

});

/**
 * DELETE /users
 */
router.delete('/', (req, res) => {

    Message.remove({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'deleted all users', result});
        }
    });
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Message.findByIdAndRemove({'_id': id}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'deleted user with id' + id, result});
        }

    });
});

module.exports = router;
