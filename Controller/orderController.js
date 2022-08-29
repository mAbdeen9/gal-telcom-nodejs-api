const PendingSerialOrders = require('../Models/PendingSerialOrders');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createPendingSerialOrder = catchAsync(async (req, res, next) => {
  const orderDate = req.body.date;
  const userID = req.body.id;

  const checkIfUserSendTodayOrder = await PendingSerialOrders.findOne({
    id: userID,
    date: orderDate,
  });

  if (checkIfUserSendTodayOrder) {
    next(new AppError('הזמנה אחת ליום ✋🏻 ', 401));
    return;
  }

  const newOrder = await PendingSerialOrders.create(req.body);
  res.status(200).json({
    status: 'Success',
    message: `קיבלנו את בקשתך בהצלחה 👍`,
    order: newOrder,
  });
});

exports.getAllPendingOrders = catchAsync(async (req, res, next) => {
  const pendingSerialOrder = await PendingSerialOrders.find();

  res.status(200).json({
    status: 'Success',
    data: pendingSerialOrder,
  });
});
