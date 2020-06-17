const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getDb = require('../util/database').getDb;
const Employee = require('../models/employee');

//User Sign-up (Incomplete)
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            const teacher = new Employee({
                name: name,
                password: hashedPw,
                email: email
            });
        })
        .catch(err => {console.log(err)})
}

//User Login
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const db = getDb();
    let loadedUser
    db.collection('employee').findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error("User not found");
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            if(password===loadedUser.password) {
                const token = jwt.sign({
                    email: loadedUser.email,
                    id: loadedUser._id.toString(),
                }, 
                'secret',
                { expiresIn: '2h' }
              );
              res.status(200).json({ token: token, userId: loadedUser._id.toString() });
            } else {
                const error = new Error("Invalid Credentials");
                error.statusCode = 401;
                throw error;
            }
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode=500;
            };
            next(err);
        });
};