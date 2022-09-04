const PendingSerialOrders = require('../Models/PendingSerialOrders');
const PendingNoSerialOrder = require('../Models/PendingNoSerialOrders');
const FulFilledSerialOrders = require('../Models/FulFilledSerialOrders');
const FulFilledNoSerialOrders = require('../Models/FulFilledNoSerialOrders');
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

  const fillterdOrder = req.body.order.filter((o) => o.value !== null);

  req.body.order = fillterdOrder;

  const newOrder = await PendingSerialOrders.create(req.body);
  res.status(200).json({
    status: 'success',
    message: `קיבלנו את בקשתך בהצלחה 👍`,
    order: newOrder,
  });
});

exports.createPendingNoSerialOrder = catchAsync(async (req, res, next) => {
  const orderDate = req.body.date;
  const userID = req.body.id;

  const checkIfUserSendTodayOrder = await PendingNoSerialOrder.findOne({
    id: userID,
    date: orderDate,
  });

  if (checkIfUserSendTodayOrder) {
    next(new AppError('הזמנה אחת ליום ✋🏻 ', 401));
    return;
  }

  const fillterdOrder = req.body.order.filter((o) => o.value !== null);

  req.body.order = fillterdOrder;

  const newOrder = await PendingNoSerialOrder.create(req.body);
  res.status(200).json({
    status: 'success',
    message: `קיבלנו את בקשתך בהצלחה 👍`,
    order: newOrder,
  });
});

exports.getAllPendingOrders = catchAsync(async (req, res, next) => {
  const pendingSerialOrder = await PendingSerialOrders.find();
  const pendingNoSerialOrder = await PendingNoSerialOrder.find();

  const orders = [...pendingSerialOrder, ...pendingNoSerialOrder];

  res.status(200).json({
    status: 'success',
    data: orders,
  });
});

exports.getMySerialOrders = catchAsync(async (req, res, next) => {
  const myPendingOrders = await PendingSerialOrders.find({ id: req.user.id });
  const myFullfildOrders = await FulFilledSerialOrders.find({
    id: req.user.id,
  });

  const orders = [...myPendingOrders, ...myFullfildOrders];
  const sortedArray = orders.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  res.status(200).json({
    status: 'success',
    data: sortedArray,
  });
});

exports.getMyNoSerialOrders = catchAsync(async (req, res, next) => {
  const myPendingOrders = await PendingNoSerialOrder.find({ id: req.user.id });
  const myFullfildOrders = await FulFilledNoSerialOrders.find({
    id: req.user.id,
  });

  const orders = [...myPendingOrders, ...myFullfildOrders];
  const sortedArray = orders.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  res.status(200).json({
    status: 'success',
    data: sortedArray,
  });
});

exports.checkedSerial = catchAsync(async (req, res, next) => {
  const checked = req.body;
  delete checked._id;
  const order = await FulFilledSerialOrders.create(checked);

  await PendingSerialOrders.deleteOne(req.body._id);
  res.status(200).json({
    status: 'success',
    data: order,
  });
});

exports.checkedNoSerial = catchAsync(async (req, res, next) => {
  const order = await FulFilledNoSerialOrders.create(req.body);

  res.status(200).json({
    status: 'success',
    data: order,
  });
});
