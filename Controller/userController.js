const User = require('../Models/User');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'Success',
    message: `new account for ${newUser.name} created successfully`,
  });
});
