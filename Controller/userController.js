const { User, validateRegister } = require('../Models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res, next) => {
  //- Joi Validate
  const { error } = validateRegister(req.body);
  if (error) return next(new AppError(error.message, 400));

  //- Check if user is already exist in DB
  const user = await User.findOne({ phone: req.body.phone });
  if (user) return next(new AppError('User is already exist!', 400));

  //- Register New User To DB Encrypt Password will be handled by the moongose midleware
  //  in the user model
  const newUser = await User.create(req.body);

  res.status(200).json({
    status: 'Success',
    message: `new account for ${newUser.name} created successfully`,
  });
});
