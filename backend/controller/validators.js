const { body } = require('express-validator');

exports.signup = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
    ];
};