const AppError = require('../Utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again', 401);

const handleJWTExpired = () =>
  new AppError('Token expired. Please log in again', 401);

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  // operational error happened
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
    // Programming or other unknown error: dont show details to client
  } else {
    console.error('ERROR', error);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (error, req, res, next) => {
  // Global error handling middleware
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error, name: error.name, errmsg: error.errmsg };

    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }

    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }

    if (err.name === 'ValidationError') {
      err = handleValidationErrorDB(err);
    }

    if (err.name === 'JsonWebTokenError') {
      err = handleJWTError();
    }

    if (err.name === 'TokenExpiredError') {
      err = handleJWTExpired();
    }

    sendErrorProd(err, res);
  }
};
