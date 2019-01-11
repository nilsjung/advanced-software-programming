/**
 * The _Userchat Routes_ to enable operations on the mongoose `Userchat` model.
 *
 * **Methods**
 * * GET /userchats
 * * GET /userchats/:id
 * * POST /userchats
 */

const express = require('express');
const router = express.Router();
const auth = require('../security/authMiddleware');
const Userchat = require('../model/userchat');

/**
 * `GET /api/userchat/`
 * on success it returns the stored userchats
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
 * `GET /api/userchat/:id`
 * on success it returns the chatroom with id `:id`
 */
router.get('/:id', (req, res) => {
    const chatId = req.params.id;

    if (!chatId) {
        res.status(301).json({ message: 'no chatroom specified' });
    }

    Userchat.findOne({ id: chatId }, (err, chatroom) => {
        if (err) {
            res.json({ message: `could not find userchat with id ${chatId}` });
        } else {
            res.json(chatroom);
        }
    });
});

/**
 * `POST /api/userchat`
 * expects the userchat-name as payload with key `chatId`
 * on success it creates a new userchat
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
