const express = require('express');
const loginController = require('./../Controller/loginController');

const router = express.Router();

// Login
router.route('/').post(loginController.login);

module.exports = router;
