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

router
  .route('/new-noSerial-order')
  .post(authController.protect, orderContoller.createPendingNoSerialOrder);

router
  .route('/my-serials-orders')
  .get(authController.protect, orderContoller.getMySerialOrders);

router
  .route('/my-no-serials-orders')
  .get(authController.protect, orderContoller.getMyNoSerialOrders);

module.exports = router;
