const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const authController = require('../controller/auth');

router.post('/signup', check('email').isEmail(), authController.signup);
router.post('/login', authController.login);

module.exports = router;