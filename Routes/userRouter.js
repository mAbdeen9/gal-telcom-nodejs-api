const express = require('express');
const userController = require('../Controller/userController');
const authController = require('../Controller/authController');

const router = express.Router();

router
  .route('/create-new-user')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userController.createUser
  );

module.exports = router;
