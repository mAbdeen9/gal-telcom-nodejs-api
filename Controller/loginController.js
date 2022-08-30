const jwt = require('jsonwebtoken');
const { User, validateLogin } = require('../Models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = catchAsync(async (req, res, next) => {
  // 1) Check if phone and password exist (Joi Validation)
  const { error } = validateLogin(req.body);
  if (error) return next(new AppError('נא לספק טלפון וסיסמה', 400));
  const { phone, password } = req.body;
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ phone }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('טלפון או סיסמה שגויים', 401));
  }
  // 3) if everything ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'Success',
    data: {
      username: user.name,
      id: user.id,
      role: user.role,
      token,
    },
  });
});
