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
  .route('/checked-serial')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.checkedSerial
  );

router
  .route('/get-user-serial-orders/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.getUserSerialOrders
  );

router
  .route('/add-serial-to-list')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.addSerialList
  );

router
  .route('/get-excel-sheet-serial')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.getExcelSheetSerial
  );

router
  .route('/get-user-no-serial-orders/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.getUserNoSerialOrders
  );

router
  .route('/aggregate-user-no-serial')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.getExcelSheetNoSerial
  );

router
  .route('/aggregate-all-no-serial')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.getExcelSheetNoSerialAll
  );

router
  .route('/checked-no-serial')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    orderContoller.checkedNoSerial
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
