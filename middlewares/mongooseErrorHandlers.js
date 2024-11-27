import HttpError from '../utils/httpError.js';
import { HttpStatus } from '../utils/responseHandler.js';

export const handleDbValidationError = (err) => {
  const errMsg = Object.values(err.errors)
    .reverse()
    .map((err, indx) => {
      const { message } = err;
      return `${indx + 1}) ${message}`;
    })
    .join('. ');

  return new HttpError(errMsg, HttpStatus.BAD_REQUEST);
};

export const handleDbCastError = (err) => {
  const message = `Invalid ${err.path} value: ${err.value}`;
  return new HttpError(message, HttpStatus.BAD_REQUEST);
};

export const handleDbDuplicateFields = (err) => {
  const { keyValue } = err;
  const property = Object.keys(keyValue)[0];
  const value = keyValue[property];

  const message = `Duplicate value for ${property}: '${value}'`;
  return new HttpError(message, HttpStatus.BAD_REQUEST);
};
