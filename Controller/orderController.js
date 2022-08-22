exports.getAllPendingOrders = (req, res, next) => {
  res.status(200).json({
    status: 'Success',
    data: 'Testing pending-orders Route  !',
  });
};
