/**
 * Define the tests for the route `chatroom`
 *
 * @param {Object} app the server
 * @param {Object} chai the test framework chai object
 * @param {Object} url the url path before the chatroom route. eg '/api/'
 */
const chatroomTests = (app, chai, url) => {
    const Chatroom = require('../model/chatroom');
    const User = require('../model/user');
    const chatroomEndpoint = url + '/chatroom/';
    const userEndpoint = url + '/user/';

    const removeUser = (done) => {
        User.deleteMany({}, () => {
            done();
        });
    };

    const removeChatroom = (done) => {
        Chatroom.deleteMany({}, () => {
            done();
        });
    };

    describe('chatroom endpoint', () => {
        before(removeUser);
        before(removeChatroom);

        let MaxMusterman = {
            firstname: 'Max',
            lastname: 'Musterman',
            email: 'max@musterman.de',
            password: '12345678',
        };

        let newChatroom = {
            name: 'New Chatroom',
            chats: [],
            users: [],
        };

        var token = '';
        const authHeader = 'X-Custom-Authorisation';

        before((done) => {
            let max = new User(MaxMusterman);
            let chat = new Chatroom(newChatroom);
            max.save();
            chat.save();
            done();
        });

        // log in a user to generate a token
        before((done) => {
            // register user ...
            chai.request(app)
                .post(userEndpoint)
                .send(MaxMusterman)
                .end();
            // ... and log the user in
            chai.request(app)
                .post(userEndpoint + 'login')
                .send(MaxMusterman)
                .end((err, res) => {
                    token = res.body.token;
                });
            done();
        });

        describe('GET /chatrooms', () => {
            it('it should get all saved chatrooms', (done) => {
                chai.request(app)
                    .get(chatroomEndpoint)
                    .set(authHeader, token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('chatrooms');
                        res.body.chatrooms.should.be.a('array');
                        res.body.should.have
                            .property('message')
                            .eql('chatrooms loaded');
                        done();
                    });
            });
        });

        describe('POST /chatrooms/:id/user', () => {
            it('it should add a user to a chatroom', (done) => {
                chai.request(app)
                    .post(chatroomEndpoint + newChatroom.name + '/user')
                    .set(authHeader, token)
                    .send({ userid: MaxMusterman.email })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have
                            .property('message')
                            .eql('user successfully added');
                        res.body.should.have.property('chatroom');
                        res.body.chatroom.should.have
                            .property('name')
                            .eql(newChatroom.name);
                        res.body.chatroom.should.have.property('users');
                        res.body.chatroom.users.length.should.eql(1);
                        res.body.chatroom.users[0].should.have.property('role');
                        res.body.chatroom.users[0].should.have.property(
                            'email'
                        );
                        res.body.chatroom.users[0].email.should.eql(
                            MaxMusterman.email
                        );
                        res.body.chatroom.users[0].role.should.eql('USER');
                        done();
                    });
            });
        });
    });
};

module.exports = chatroomTests;
