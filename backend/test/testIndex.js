process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const should = chai.should();
const url = '/api';

const userTests = require('./user');
const chatroomTests = require('./chatroom');
chai.use(chaiHttp);

const runTests = (app, chai, url) => {
    userTests(app, chai, url);
    chatroomTests(app, chai, url);
};

runTests(app, chai, url);
