const express = require('express');
const orderContoller = require('../Controller/orderController');

const router = express.Router();

router.route('/pending-orders').get(orderContoller.getAllPendingOrders);
router.route('/new-serial-order').post(orderContoller.createPendingSerialOrder);

module.exports = router;
