const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');

const validators = require('../controller/validators');

router.post('/signup', validators.signup(), authController.signup);
router.post('/login', authController.login);

module.exports = router;