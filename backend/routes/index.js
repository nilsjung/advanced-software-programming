var express = require('express');
var router = express.Router();

const usersRouter = require('./users');
const chatroomRouter = require('./chatrooms');

router.use('/user', usersRouter);
router.use('/chatroom', chatroomRouter);

module.exports = router;
