const express = require('express');
const userController = require('../Controller/userController');

const router = express.Router();

router.route('/create-new-user').post(userController.createUser);

module.exports = router;
