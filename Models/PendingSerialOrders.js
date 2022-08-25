const mongoose = require('mongoose');

const PendingSerialOrdersSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, 'order must have id !'],
  },
  username: {
    type: String,
    required: [true, 'order must have username !'],
  },
  dateTime: {
    type: String,
    required: [true, 'order must have dateTime !'],
  },
  orderType: {
    type: String,
    required: [true, 'order must have orderType !'],
  },
  orederStatus: {
    type: String,
    required: [true, 'order must have orederStatus!'],
  },
  order: [
    {
      name: String,
      value: String,
      type: String,
    },
  ],
});

const PendingSerialOrders = PendingSerialOrdersSchema.model(
  'PendingSerialOrders',
  PendingSerialOrdersSchema
);

module.exports = PendingSerialOrders;
