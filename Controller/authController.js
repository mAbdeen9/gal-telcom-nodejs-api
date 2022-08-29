const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //   else if (req.cookies.jwt) {
  //     token = req.cookies.jwt;
  //   }

  if (!token) {
    return next(new AppError('אתה לא מחובר', 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('אתה לא מחובר', 401));
  }

  // ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  //   res.locals.user = currentUser;
  next();
});

exports.restrictTo = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    next(new AppError('you are not admin !'), 403);
  }
  next();
};
