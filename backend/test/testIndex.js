process.env.NODE_ENV = 'test';

/**
 * Testfiles to test the backend and develop test driven.
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const should = chai.should();
const url = '/api';

const userTests = require('./user');
const chatroomTests = require('./chatroom');
chai.use(chaiHttp);

// register tests
const runTests = (app, chai, url) => {
    userTests(app, chai, url);
    chatroomTests(app, chai, url);
};

// execute tests
runTests(app, chai, url);
