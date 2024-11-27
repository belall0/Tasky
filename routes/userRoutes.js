import express from 'express';
import * as authController from '../controllers/authController.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', userController.getAllUsers);
export default router;
