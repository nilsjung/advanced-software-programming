/**
 * Chatroom Route
 *
 * Methods:
 * GET /chatroom
 * GET /chatroom/:id
 * POST /chatroom
 * PUT /chatroom/:id
 */

const token = require('../security/token');
const express = require('express');
const router = express.Router();

const Chatroom = require('../model/chatroom');

/**
 * GET /chatrooms
 */
router.get('/', (req, res) => {
    Chatroom.find({}, (err, chatrooms) => {
        if (err) {
            res.end(err);
        }

        res.contentType('application/json');
        res.json({ chatrooms });
    });
});

router.get('/:name', (req, res) => {
    Chatroom.findOne({ name: req.params.name }, (err, chatroom) => {
        if (err) {
            res.send(err);
        } else {
            res.json(chatroom);
        }
    });
});

/**
 * POST /chatrooms
 */

router.post('/', (req, res) => {
    //validate token:
    token
        .verify(req)
        .then((result) => {
            var name = req.body.chatroom;

            Chatroom.findOne({ name: name }, (err, chatroom) => {
                if (chatroom) {
                    res.status(400).send({
                        message: 'chatroom already in use',
                    });
                    return;
                }

                const newChatroom = new Chatroom({ name: name, chats: [] });
                newChatroom.save((err, chatroom) => {
                    return chatroom;
                });

                res.json({
                    message: 'chatroom created',
                    chatroom: newChatroom,
                });
            });
        })
        .catch((err) => {
            res.status(403).send({ message: 'authentication failed' });
        });
});

router.delete('/:name', auth, (req, res) => {
    const chatroomName = req.params.name;

    Chatroom.deleteOne({ name: chatroomName }, (err) => {
                if (err) {
            res.status(500).json({message: err});
                } else {
            Chatroom.find({}, (err, chatrooms) => {
                if (err) {
                    res.status(500).json({
                        message: 'error while loading chatrooms after deletion'
                    })
                }
                    res.status(200).json({
                    message: `Chatroom ${chatroomName} successfully deleted!`,
                    chatrooms: chatrooms,
            });
        })
        }
        });
});

module.exports = router;
