const ENV = process.env.NODE_ENV || 'production';

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // send generic message
  res.status(500).json({
    status: 'error',
    message: 'something went wrong, please try again later',
  });
};

const globalErrorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (ENV === 'development') {
    sendErrorDev(err, res);
  } else if (ENV === 'production') {
    sendErrorProd(err, res);
  }
};

export default globalErrorHandlerMiddleware;
