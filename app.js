const express = require('express');
const morgan = require('morgan');
const loginRouter = require('./Routes/loginRouter');
const orderRouter = require('./Routes/orederRouter');
const userRouter = require('./Routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');

const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' })); // body parser

// 2) Middlewares Routes
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/user', userRouter);
app.all('*', (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404))
);

// 3) Express Built in Global Error Handler Middleware
app.use(globalErrorHandler);

module.exports = app;
