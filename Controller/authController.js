const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return next(new AppError('אתה לא מחובר', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //  Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('אתה לא מחובר', 401));
  }
  req.user = currentUser;
  next();
});

exports.checkValidToken = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return next(new AppError('אתה לא מחובר', 401));
  }


  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new AppError('אתה לא מחובר', 401));
  }

  next()
});

exports.restrictTo = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    next(new AppError('Access Denied !'), 403);
  }
  next();
};
