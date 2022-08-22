exports.login = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    status: 'Success',
    message: 'Successful logged in 🔑 ! ',
  });
};
