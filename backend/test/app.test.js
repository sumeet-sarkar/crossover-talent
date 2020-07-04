const mongoConnect = require('../util/database').mongoConnect;
const getClient = require('../util/database').getClient;
const authController = require('../controller/auth');
const authMiddleware = require('../middleware/verifyAuth');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);

describe ("Welcome to API testing of Crossover Talent", () => {
    describe ("User Sign Up", () => {
        it ("Should not register user when required fields are not provided");
        it ("Should sign user with valid details");
    });
    describe ("User Login", () => {
        before (function(done) {
            mongoConnect(() => { done()} )
        });
        after (function(done) {
            const client = getClient();
            client.close();
            done();
        });
        it ("Should return unauthorized if no user found", function(done) {
            const req = {
                body: {
                    email: "test.test@gmail.com",
                    password: "test"
                }
            }
            authController.login(req, {}, () => {})
                .then(res => {
                    expect(res).to.be.an('error');
                    expect(res).to.have.property('statusCode', 401);
                    done();
                });
        });
        it ("Should return invalid credentials when wrong password is used", function(done) {
            const req = {
                body: {
                    email: "sudarshan97.kudli@gmail.com",
                    password: "test"
                }
            }
            authController.login(req, {}, () => {})
                .then(res => {
                    expect(res).to.be.an('error');
                    expect(res).to.have.property('statusCode', 401);
                    done();
                });
        });
        it ("Should login a valid user", function(done) {
            const req = {
                body: {
                    email: "sudarshan97.kudli@gmail.com",
                    password: "suda1234"
                }
            }
            const res = {
                message: {},
                statusCode: 500,
                status: function(status) {
                    this.statusCode = status;
                    return this;
                },
                json: function(message) {
                    this.message = message
                }
            };
            authController.login(req, res, () => {})
                .then(res => {
                    expect(res).to.be.an('Object');
                    expect(res).to.have.property('statusCode', 200);
                    done();
                });
        });
    });
    describe ("Employee Actions", () => {
        it ("Should be able to view jobs");
        it ("Should be able to search jobs");
        it ("Should be able to view jobs with filters");
        it ("Should be able to view individual jobs");
        it ("Should be able to apply to jobs");
        it ("Should be able to delete his applications");
    });
    describe ("Employer actions");
        it ("Should be able to accept a request");
        it ("Should be able to reject a request");
});