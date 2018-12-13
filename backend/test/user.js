process.env.NODE_ENV = 'test';

let User = require('../model/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app.js');

let should = chai.should();

const url = '/api';

chai.use(chaiHttp);

const MaxMusterman = {
    firstname: 'Max',
    email: 'max.mustermann@testmail.com',
    lastname: 'Mustermann',
    password: '12345678',
};

describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    before((done) => {
        chai.request(app)
            .post(url + '/user')
            .send(MaxMusterman)
            .end((err, res) => {});
        done();
    });

    /**
     * Tests for GET all
     */
    describe('/GET user', () => {
        it('it should GET all users', (done) => {
            chai.request(app)
                .get(url + '/user')
                .end((err, res) => {
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
    describe('/GET/:id', () => {
        it('it should GET a user by the given ID', (done) => {
            let user = new User(MaxMusterman);
            user.save((err, user) => {
                chai.request(app)
                    .get(url + '/user/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstname');
                        res.body.should.have.property('lastname');
                        res.body.should.have.property('email');
                        res.body.should.have.property('password');
                        res.body.should.have.property('_id').eql(user.id);
                        done();
                    });
            });
        });
    });

    /**
     * Tests for POST
     */
    describe('/Post user', () => {
        it('it creates a new user', (done) => {
            chai.request(app)
                .post(url + '/user')
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
                    .post(url + '/user')
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

        it('it creates no user if arguments are missing', (done) => {
            let max = { ...MaxMusterman };
            delete max.lastname;

            chai.request(app)
                .post(url + '/user')
                .send(max)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have
                        .property('message')
                        .eql('data not complete');
                    done();
                });
        });
    });

    describe('/login user', () => {
        beforeEach((done) => {
            let max = new User(MaxMusterman);
            max.save(() => {});
            done();
        });

        it('it should log in an existing user', (done) => {
            chai.request(app)
                .post(url + '/user/login')
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
                .post(url + '/user/login')
                .send(max)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.have.property('user').eql(null);
                    res.body.should.have
                        .property('error')
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
                .post(url + '/user/login')
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
