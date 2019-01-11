var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const chatroomRouter = require('./chatrooms');
const userchatRouter = require('./userchats');

router.use('/user', usersRouter);
router.use('/chatroom', chatroomRouter);
router.use('/userchat', userchatRouter);

module.exports = router;
