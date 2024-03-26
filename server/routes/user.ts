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
	userController.userLogInPost
);

router.get('/auth/google', userController.getGoogleAccountInfo);

router.get('/auth/google/callback', userController.getGoogleCallback);

router.get('/protected', (req, res, next) => {
	res.send('Protected');
});

router.get('/auth/failure', (req, res, next) => {
	res.send('failure');
});

export default router;
