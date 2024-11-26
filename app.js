import express from 'express';
import morgan from 'morgan';

import HttpError from './utils/httpError.js';
import globalErrorHandlerMiddleware from './middlewares/errorHandlers.js';

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/home', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to our API',
  });
});

app.all('*', (req, res, next) => {
  next(new HttpError(`The endpoint you requested (${req.originalUrl}) could not be found.`, 404));
});

app.use(globalErrorHandlerMiddleware);

export default app;
