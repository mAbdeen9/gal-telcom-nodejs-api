const express = require('express');
const morgan = require('morgan');
const loginRouter = require('./Routes/loginRouter');
const orderRouter = require('./Routes/orederRouter');
const userRouter = require('./Routes/userRouter');

const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' })); // body parser

// 2) Middlewares Routes
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
