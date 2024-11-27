import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import { HttpStatus, success } from '../utils/responseHandler.js';
import { generateToken } from '../utils/jwtUtils.js';

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = generateToken(user._id);
  user.password = undefined; // to remove password from output

  success(res, HttpStatus.CREATED, user, 'user', token);
});
