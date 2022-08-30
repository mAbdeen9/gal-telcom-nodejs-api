const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

const loginRouter = require('./Routes/loginRouter');
const orderRouter = require('./Routes/orederRouter');
const userRouter = require('./Routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');

const app = express();
const limiter = rateLimit({
  max: 120,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.enable('trust proxy');

// 1) Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors()); // Implement CORS
app.options('*', cors());
app.use(express.json({ limit: '20kb' })); // body parser
app.use(helmet()); // Set security HTTP headers
app.use('/api', limiter); // Limit requests from same IP
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(compression()); //improve the performance
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
