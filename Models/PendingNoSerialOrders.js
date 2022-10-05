const mongoose = require('mongoose');

const PendingNoSerialOrdersSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'order must have id!'],
  },
  username: {
    type: String,
    required: [true, 'order must have username!'],
  },
  date: {
    type: String,
    required: [true, 'order must have date!'],
  },
  time: {
    type: String,
    required: [true, 'order must have Time!'],
  },
  orderType: {
    type: String,
    required: [true, 'order must have orderType!'],
  },
  orederStatus: {
    type: String,
    required: [true, 'order must have orederStatus!'],
  },
  order: [
    {
      name: { type: String },
      value: { type: String },
      type: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const PendingNoSerialOrders = mongoose.model(
  'Pending-NoSerial-Orders',
  PendingNoSerialOrdersSchema
);

module.exports = PendingNoSerialOrders;
