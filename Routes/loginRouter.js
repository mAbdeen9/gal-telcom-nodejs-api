const express = require('express');
const loginController = require('../Controller/loginController');
const authController = require('../Controller/authController');

const router = express.Router();

// Login
router.route('/').post(loginController.login);
router.route('/valExpiredToken').post(authController.checkValidToken);

module.exports = router;
