/**
 * Define the user tests
 *
 * @param {Object} app the server
 * @param {Object} chai the test framework chai object
 * @param {Object} url the url path before the user route. eg '/api/'
 */
const userTests = (app, chai, url) => {
    let User = require('../model/user');
    const userEndpoint = url + '/user/';

    const removeUser = (done) => {
        User.deleteMany({}, () => {
            done();
        });
    };

    describe('user endpoint', () => {
        let MaxMusterman = {
            firstname: 'Max',
            email: 'max.mustermann@testmail.com',
            lastname: 'Mustermann',
            password: '12345678',
        };

        describe('with a non logged in user', () => {
            before(removeUser);

            /**
             * Tests for POST
             */
            describe('Post /user', () => {
                it('it should create a new user', (done) => {
                    chai.request(app)
                        .post(userEndpoint)
                        .send(MaxMusterman)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('message')
                                .eql('user created');
                            res.body.user.should.have.property('lastname');
                            res.body.user.should.have.property('firstname');
                            res.body.user.should.have.property('email');
                            done();
                        });
                });

                it('it should not create two users with the same email', (done) => {
                    const user = new User(MaxMusterman);
                    user.save(() => {
                        chai.request(app)
                            .post(userEndpoint)
                            .send(user)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have
                                    .property('message')
                                    .eql('email already in use');
                                done();
                            });
                    });
                });

                it('it should create no user if arguments are missing', (done) => {
                    let max = { ...MaxMusterman };
                    delete max.lastname;

                    chai.request(app)
                        .post(userEndpoint)
                        .send(max)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('message')
                                .eql('data not complete');
                            done();
                        });
                });
            });

            describe('POST /user/login', () => {
                beforeEach((done) => {
                    let max = new User(MaxMusterman);
                    max.save(() => {});
                    done();
                });

                it('it should log in an existing user', (done) => {
                    chai.request(app)
                        .post(userEndpoint + 'login')
                        .send(MaxMusterman)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('message')
                                .eql('successfully logged in');
                            res.body.should.have.property('user');
                            res.body.user.should.have.property('email');
                            res.body.user.should.have.property('password');
                            done();
                        });
                });

                it('it should not log in an user with a wrong password', (done) => {
                    let max = { ...MaxMusterman, password: 'wrongPassword' };
                    chai.request(app)
                        .post(userEndpoint + 'login')
                        .send(max)
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.should.have.property('user').eql(null);
                            res.body.should.have
                                .property('message')
                                .eql('invalid password');
                            done();
                        });
                });

                it('it should not log in an non existing user', (done) => {
                    const MaxMusterfrau = {
                        firstname: 'Maxime',
                        lastname: 'Musterfrau',
                        password: '222333',
                        email: 'maxime@musterfrau.com',
                    };

                    chai.request(app)
                        .post(userEndpoint + 'login')
                        .send(MaxMusterfrau)
                        .end((err, res) => {
                            res.should.have.status(404);
                            res.body.should.be.a('object');
                            res.body.should.have
                                .property('error')
                                .eql('user not found');
                            res.body.should.not.have.property('user');
                            done();
                        });
                });
            });
        });

        describe('with a logged in user', () => {
            // remove existing users
            beforeEach(removeUser);

            var token = '';
            const authHeader = 'X-Custom-Authorisation';
            const secureGetRequest = (path) =>
                chai
                    .request(app)
                    .get(path)
                    .set(authHeader, token);

            const securePostRequest = (path) =>
                chai
                    .request(app)
                    .post(path)
                    .set(authHeader, token);

            before((done) => {
                chai.request(app)
                    .post(userEndpoint)
                    .send(MaxMusterman)
                    .end((err, res) => {});

                // login a user to get the token
                chai.request(app)
                    .post(userEndpoint + 'login')
                    .send(MaxMusterman)
                    .end((err, res) => {
                        token = res.body.token;
                    });
                done();
            });

            /**
             * Tests for GET all
             */
            describe('GET /user', () => {
                it('it should GET all users', (done) => {
                    secureGetRequest(userEndpoint).end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
                });
            });

            /**
             * Tests for GET /users/:id
             */
            describe('GET /user/:id', () => {
                it('it should GET a user by the given ID', (done) => {
                    let user = new User(MaxMusterman);
                    user.save((err, user) => {
                        secureGetRequest(userEndpoint + user._id).end(
                            (err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('firstname');
                                res.body.should.have.property('lastname');
                                res.body.should.have.property('email');
                                res.body.should.have.property('password');
                                res.body.should.have
                                    .property('_id')
                                    .eql(user.id);
                                done();
                            }
                        );
                    });
                });
            });

            describe('POST /user/:id', () => {
                it('should not change anything if nothing is updated', (done) => {
                    let user = new User(MaxMusterman);
                    user.save((err, user) => {
                        securePostRequest(userEndpoint + user._id).end(
                            (err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.property('user');
                                res.body.user.should.have
                                    .property('_id')
                                    .eq(user.id);
                                res.body.user.should.have
                                    .property('firstname')
                                    .eq(user.firstname);
                                res.body.user.should.have
                                    .property('lastname')
                                    .eq(user.lastname);
                                res.body.user.should.have
                                    .property('email')
                                    .eq(user.email);
                                done();
                            }
                        );
                    });
                });

                it('should update the entry `firstname`', (done) => {
                    const user = new User(MaxMusterman);
                    const newFirstname = 'Mathis';

                    user.save((err, user) => {
                        securePostRequest(userEndpoint + user._id)
                            .send({ firstname: newFirstname })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.property('user');
                                res.body.should.have
                                    .property('message')
                                    .eq('successfully updated');
                                res.body.user.should.have
                                    .property('firstname')
                                    .eq(newFirstname);
                                done();
                            });
                    });
                });
            });
        });
    });
};

module.exports = userTests;
