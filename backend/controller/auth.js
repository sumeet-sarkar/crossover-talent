const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const getDb = require('../util/database').getDb;
const Employee = require('../models/employee');

//User Sign-up (Incomplete)
exports.signup = (req, res, next) => {
    const data = req.body;
    const password = data.password;
    const email = data.email;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const err = new Error(errors.array()[0]);
        err.statusCode = 422;
        throw err;
    }
    const db = getDb();
    db.collection('user').findOne({ email: email })
        .then(user => {
            if (!user) {
                return bcrypt.hash(password, 12)
            }
            const error = new Error("Email already exists");
            error.statusCode = 500;
            throw error;
        })
        .then(hashedPw => {
            const employee = new Employee({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPw
            });
            return employee.save()
        })
        .then(result => {
            res.status(200).json({ message: "User Created"})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode=500;
            };
            next(err);
        })
}

//User Login
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const db = getDb();
    let loadedUser
    db.collection('user').findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error("User not found");
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, loadedUser.password)
        })
        .then(equality => {
            if(!equality) {
                const error = new Error("Invalid Credentials");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                id: loadedUser._id.toString(),
            }, 
            'secret',
            { expiresIn: '2h' });
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode=500;
            };
            next(err);
        });
};