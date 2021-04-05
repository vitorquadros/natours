const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./src/routes/tourRoutes');
const userRouter = require('./src/routes/userRoutes');
const AppError = require('./src/Utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
