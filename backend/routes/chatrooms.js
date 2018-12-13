/**
 * Chatroom Route
 *
 * Methods:
 * GET /chatroom
 * GET /chatroom/:id
 * POST /chatroom
 * PUT /chatroom/:id
 */

const express = require('express');
const router = express.Router();
const auth = require('../security/authMiddleware');
const Chatroom = require('../model/chatroom');

/**
 * GET /chatrooms
 */
router.get('/', (req, res) => {
    Chatroom.find({}, (err, chatrooms) => {
        if (err) {
            res.status(401).send(err);
        }

        res.contentType('application/json');
        res.json({ chatrooms, message: 'chatrooms loaded' });
    });
});

router.get('/:name', (req, res) => {
    const chatroomName = req.params.name;

    if (!chatroomName) {
        res.status(301).json({ message: 'no chatroom specified' });
    }

    Chatroom.findOne({ name: chatroomName }, (err, chatroom) => {
        if (err) {
            res.json({ message: `could not find chatroom ${chatroomName}` });
        } else {
            res.json(chatroom);
        }
    });
});

/**
 * POST /chatrooms
 */
router.post('/', auth, (req, res) => {
    const chatroomName = req.body.chatroom;

    if (!chatroomName) {
        res.status(301).json({ message: 'no chatroom name specified.' });
    }

    Chatroom.findOne({ name: chatroomName }, (err, chatroom) => {
        if (chatroom) {
            res.status(400).json({
                message: 'chatroom already in use',
            });
            return;
        }

        const newChatroom = new Chatroom({ name: chatroomName, chats: [] });
        newChatroom.save((err, chatroom) => {
            return chatroom;
        });

        res.json({
            message: 'chatroom created',
            chatroom: newChatroom,
        });
    });
});

router.delete('/:name', auth, (req, res) => {
    const chatroomName = req.params.name;

    Chatroom.deleteOne({ name: chatroomName }, (err) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            Chatroom.find({}, (err, chatrooms) => {
                if (err) {
                    res.status(500).json({
                        message: 'error while loading chatrooms after deletion',
                    });
                }
                res.status(200).json({
                    message: `Chatroom ${chatroomName} successfully deleted!`,
                    chatrooms: chatrooms,
                });
            });
        }
    });
});

module.exports = router;
