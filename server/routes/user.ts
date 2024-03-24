import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController';

// POST a new user when they sign up.
router.post(
	'/sign-up',
	userController.validateUserSignUp,
	userController.userSignUpPost
);

export default router;
