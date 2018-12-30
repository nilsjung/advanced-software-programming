/**
 * Userchat Route
 *
 * Methods:
 * GET /userchats
 * GET /userchats/:id
 * POST /userchats
 */

const express = require('express');
const router = express.Router();
const auth = require('../security/authMiddleware');
const Userchat = require('../model/userchat');

/**
 * GET /userchats
 */
router.get('/', (req, res) => {
    Userchat.find({}, (err, chats) => {
        if (err) {
            res.status(401).send(err);
        }

        res.contentType('application/json');
        res.json({ chats, message: 'userchats loaded' });
    });
});

/**
 * POST /chatrooms
 */
router.post('/', auth, (req, res) => {
    Userchat.findOne({ id: req.body.chatId }, (err, chatroom) => {
        if (chatroom) {
            res.json({
                message: 'chatroom already in use',
            });
            return;
        }
        const newChatroom = new Userchat({
            id: req.body.chatId,
            chats: [],
            users: req.body.users,
        });
        newChatroom.save((err, chatroom) => {
            return chatroom;
        });

        res.json({
            message: 'userchat created',
            userchat: newChatroom,
        });
    });
});

module.exports = router;
