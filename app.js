import express from 'express';
import morgan from 'morgan';

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
  res.status(404).json({
    status: 'fail',
    message: `The endpoint you requested (${req.originalUrl}) could not be found.`,
  });
});

export default app;
