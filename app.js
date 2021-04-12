const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const tourRouter = require('./src/routes/tourRoutes');
const userRouter = require('./src/routes/userRoutes');
const AppError = require('./src/Utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();

// GLOBAL MIDDLEWARES

// set security http headers
app.use(helmet());

// show request details in log if in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limiting requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour!',
});

app.use('/api', limiter);

// body parser
app.use(express.json({ limit: '10kb' }));

// serving static files
app.use(express.static(`${__dirname}/public`));

// routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
