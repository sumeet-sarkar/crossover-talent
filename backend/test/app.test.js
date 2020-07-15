const mongoConnect = require('../util/database').mongoConnect;
const getClient = require('../util/database').getClient;
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const authController = require('../controller/auth');
const employeeController = require('../controller/employee');
const employerController = require('../controller/employer');
const Employee = require('../models/employee');
const authMiddleware = require('../middleware/verifyAuth');

chai.use(chaiHttp);

let token;
describe ("Welcome to API testing of Crossover Talent", function() {
    before (function(done) {
        mongoConnect(() => { done()} )
    });
    after (function(done) {
        const client = getClient();
        Employee.delete({ email: "test@gmail.com", password: "test1234" })
            .then(res => {
                client.close();
                done();
            })
    });
    describe ("Sign up", function() {
        it ("Should sign in user with valid details", function(done) {
            const req = {
                body: {
                    email: "test@gmail.com",
                    password: "test1234"
                }
            };
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
            authController.signup(req, res, () => {})
                .then(res => {
                    expect(res).to.have.property('statusCode', 200);
                    done();
                })
        });
        it ("Should not register when email id is already taken", function(done) {
            const req = {
                body: {
                    email: "test@gmail.com",
                    password: "test1234"
                }
            };
            authController.signup(req, {}, () => {})
                .then(res => {
                    expect(res).to.be.an('error');
                    done();
                })
        });
    });
    describe ("User Login", function() {
        it ("Should return unauthorized if no user found", function(done) {
            const req = {
                body: {
                    email: "test-wrong@gmail.com",
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
                    email: "test@gmail.com",
                    password: "test-wrong"
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
                    email: "test@gmail.com",
                    password: "test1234"
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
                    token = res.token;
                    expect(res).to.be.an('Object');
                    expect(res).to.have.property('statusCode', 200);
                    done();
                });
        });
    });
    describe ("Verify user", function() {
        it ("Should throw error when auth header is absent", function() {
            const req = {
                get: () => {
                    return null;
                }
            };
            expect(authMiddleware.bind(this, req, {}, () => {})).to.throw("Token Required");
        });
    })
    describe.only ("Employee Actions", function() {
        it ("Should be able to view jobs", function() {
            const req = {
                query: {
                    pageNo: 1,
                    itemsPerPage: 20
                }
            };
            const res = {
                message: {},
                statusCode: 500,
                status: function(status) {
                    this.statusCode = status;
                    return this;
                },
                json: function(message) {
                    this.message = message;
                }
            };
            employeeController.home(req, res, () => {})
                .then(res => {
                    expect(res).to.have.property('statusCode', 200);
                });
        });
        it ("Should be able to search jobs");
        it ("Should be able to view jobs with filters");
        it ("Should be able to view individual jobs");
    describe ("Employer actions", function() {
        it ("Should be able to accept a request");
        it ("Should be able to reject a request");
    });
});