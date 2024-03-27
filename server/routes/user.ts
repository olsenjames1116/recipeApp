import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController';

// POST a new user to validate and sign them up.
router.post(
	'/sign-up',
	userController.validateUserSignUp,
	userController.userSignUpPost
);

// POST a user's credentials to validate and log them in.
router.post(
	'/log-in',
	userController.validateUserLogIn,
	userController.checkLogInValidationResult,
	userController.authenticateUserLocal
);

// GET account info from Google OAuth.
router.get('/auth/google', userController.getGoogleAccountInfo);

// GET callback function after Google user is authenticated.
router.get('/auth/google/callback', userController.getGoogleCallback);

router.get('/authenticate', userController.isLoggedIn);

router.get('/logged-out', userController.isNotLoggedIn);

router.delete('/log-out', userController.logOutUser);

export default router;
