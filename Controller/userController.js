exports.creatNewUser = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: 'Success',
    data: 'Testing Create New User Endpoint !',
  });
};
