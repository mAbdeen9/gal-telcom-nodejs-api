const express = require('express');
const orderContoller = require('../Controller/orderController');
const authController = require('../Controller/authController');

const router = express.Router();

router
  .route('/pending-orders')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.getAllPendingOrders
  );
router
  .route('/new-serial-order')
  .post(authController.protect, orderContoller.createPendingSerialOrder);

module.exports = router;
