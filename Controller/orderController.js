/* eslint-disable node/no-unsupported-features/es-syntax */
const PendingSerialOrders = require('../Models/PendingSerialOrders');
const PendingNoSerialOrder = require('../Models/PendingNoSerialOrders');
const FulFilledSerialOrders = require('../Models/FulfilledSerialOrders');
const FulFilledNoSerialOrders = require('../Models/FulfilledNoSerialOrders');
const Serial = require('../Models/Serials');

const { User } = require('../Models/User');

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
  const checked = { ...req.body };
  delete checked._id;
  const fillterdOrder = checked.order.filter((o) => o.value !== '--');
  checked.order = fillterdOrder;
  await FulFilledSerialOrders.create(checked);
  await PendingSerialOrders.findByIdAndDelete(req.body._id);
  res.status(200).json({
    status: 'success',
  });
});

exports.checkedNoSerial = catchAsync(async (req, res, next) => {
  const checked = { ...req.body };
  delete checked._id;

  const fillterdOrder = checked.order.filter((o) => o.value !== '--');
  checked.order = fillterdOrder;
  await FulFilledNoSerialOrders.create(checked);
  await PendingNoSerialOrder.findByIdAndDelete(req.body._id);
  res.status(200).json({
    status: 'success',
  });
});

exports.getUserSerialOrders = catchAsync(async (req, res, next) => {
  const data = await FulFilledSerialOrders.find(req.params);

  if (data.length <= 0) {
    return next(new AppError('אין מידע', 404));
  }

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.getUserNoSerialOrders = catchAsync(async (req, res, next) => {
  const data = await FulFilledNoSerialOrders.find(req.params);

  if (data.length <= 0) {
    return next(new AppError('אין מידע', 404));
  }

  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.getExcelSheetNoSerial = catchAsync(async (req, res, next) => {
  const { id, startingDate, endDate } = req.body;
  const user = await User.find({ id: id });
  const data = await FulFilledNoSerialOrders.aggregate([
    {
      $match: {
        id: { $eq: id },
        createdAt: {
          $gte: new Date(startingDate),
          $lt: new Date(`${endDate},24:00:00`),
        },
      },
    },
    {
      $group: {
        _id: '$order',
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: data,
    user,
  });
});

exports.getExcelSheetNoSerialAll = catchAsync(async (req, res, next) => {
  const { startingDate, endDate } = req.body;

  const data = await FulFilledNoSerialOrders.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startingDate),
          $lt: new Date(`${endDate},24:00:00`),
        },
      },
    },
    {
      $group: {
        _id: '$order',
        user: { $first: '$username' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.addSerialList = catchAsync(async (req, res, next) => {
  const data = req.body;
  console.log(data);
  await Serial.create(data);
  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.getExcelSheetSerial = catchAsync(async (req, res, next) => {
  const { id, startingDate, endDate } = req.body;
  const user = await User.find({ id: id });
  const data = await Serial.aggregate([
    {
      $match: {
        id: { $eq: id },
        createdAt: {
          $gte: new Date(startingDate),
          $lt: new Date(`${endDate},24:00:00`),
        },
      },
    },
    {
      $group: {
        _id: '$serials',
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: data,
    user,
  });
});
