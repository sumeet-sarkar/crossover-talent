const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const getDb = require('../util/database').getDb;
const Employee = require('../models/employee');
const validators = require('../controller/validators');

//User Sign-up (Incomplete)
exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    const { password, email, first_name, last_name } = req.body;
    try {
        if (!errors.isEmpty()) {
            const err = new Error(errors.array());
            err.statusCode = 422;
            throw err;
        };
        const db = getDb();
        if (typeof db === 'Error') throw db;
        //Check if email is taken
        const user = await db.collection('user').findOne({ email: email })
        if (user) {
            const error = new Error("Email already exists");
            error.statusCode = 403;
            throw error;
        }
        const hashedPw = await bcrypt.hash(password, 12)
        const employee = new Employee({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPw
        });
        const result = await employee.save();
        res.status(200).json({ message: "User Created"});
        return res;
    } catch(err) {
        next(err);
        return err;
    }
}

//User Login
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const db = getDb();
    let loadedUser
    return db.collection('user').findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error("User not found");
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, loadedUser.password);
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
            { expiresIn: '24h' });
            delete loadedUser.password;
            res.status(200).json({ token: token, user: loadedUser });
            return res;
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode=500;
            };
            next(err);
            return err;
        });
};