process.env.NODE_ENV = 'test';

let User = require('../model/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../bin/www');

let should = chai.should();

chai.use(chaiHttp);

const MaxMusterman = {
    firstname: 'Max',
    email: 'max.mustermann@testmail.com',
    lastname: 'Mustermann',
    age: 35
};

describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    /**
     * Tests for GET all
     */
    describe('/GET user', () => {
        it('it should GET all users', (done) => {
            chai.request(app)
                .get('/users')
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
                    .get('/users/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstname');
                        res.body.should.have.property('lastname');
                        res.body.should.have.property('email');
                        res.body.should.have.property('age');
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
                .post('/users')
                .send(MaxMusterman)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('user created');
                    res.body.user.should.have.property('lastname');
                    res.body.user.should.have.property('firstname');
                    res.body.user.should.have.property('email');
                    res.body.user.should.have.property('age');
                    done();
                });
        });

        it('it creates no user if arguments are missing', (done) => {
            delete MaxMusterman.lastname;

            chai.request(app)
                .post('/users')
                .send(MaxMusterman)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.errors.should.have.property('lastname');
                    res.body.errors.lastname.should.have.property('kind').eql('required');
                    done();
                });
        });
    });

    describe('/login user', () => {
        it('it should log in an existing user', (done) => {

            // save the user to database to request q
            const max = new User(MaxMusterman);
            max.save(() => { });

            chai.request(app)
                .post('login')
                .send(max)
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('successfully logged in');
                    res.body.should.have.property('user').eql(MaxMusterman);
                    done();
                });
        });
    });

    it('it should not log in an non existing user', (done) => {
        chai.request(app)
            .post('login')
            .send(MaxMusterman)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('successfully logged in');
                res.body.should.have.property('user').eql(MaxMusterman);
                done();
            });
    });

});