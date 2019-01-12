const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const chatroomRouter = require('./chatrooms');
const userchatRouter = require('./userchats');

/**
 * register routes
 */
router.use('/user', usersRouter);
router.use('/chatroom', chatroomRouter);
router.use('/userchat', userchatRouter);

module.exports = router;
