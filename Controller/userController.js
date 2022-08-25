const User = require('../Models/User');

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: 'Success',
      message: `new account for ${newUser.name} created successfully`,
    });
  } catch (err) {
    res.status(404).json({
      status: 'Failed',
      message: err.message,
    });
  }
};
