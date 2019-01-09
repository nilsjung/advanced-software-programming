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
const User = require('../model/user');

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
        const newChatroom = new Chatroom({
            name: chatroomName,
            chats: [],
            users: req.body.users,
        });
        newChatroom.save((err, chatroom) => {
            return chatroom;
        });

        res.json({
            message: 'chatroom created',
            chatroom: newChatroom,
        });
    });
});

const isMember = (chatroom, user) => {
    const member = chatroom.users.findIndex((member) => {
        return member.email === user.email;
    });

    return member >= 0;
};

// add a user to a chatroom
router.post('/:chatroomid/user/', auth, (req, res) => {
    const chatroomId = req.params.chatroomid;

    User.findOne({ email: req.body.userid }, (err, user) => {
        if (user) {
            Chatroom.findOne({ name: chatroomId }, (err, chatroom) => {
                if (err) {
                    res.status(304).json({
                        message: 'error while loading chatroom',
                        err: err,
                    });
                    return;
                }
                if (chatroom) {
                    if (!isMember(chatroom, user)) {
                        let member = { ...user._doc, role: 'USER' };
                        chatroom.users.push(member);
                        chatroom.save();
                        res.status(200).json({
                            message: 'user successfully added',
                            chatroom: chatroom,
                        });
                    }
                }
            });
        }

        if (err) {
            res.status(304).json({ message: 'user not found' });
        }
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
