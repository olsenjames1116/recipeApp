import User from '../models/user';
import { body, validationResult } from 'express-validator';
import { IUser } from '../utils/types';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import client from '../utils/redis';
import querystring from 'node:querystring';
import passport from 'passport';

// Validate and sanitize fields to create user on sign up.
export const validateUserSignUp = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.isLength({ max: 20 })
		.withMessage('Username must be less than 20 characters.')
		.custom(async (username: string) => {
			const user = await User.findOne({ username: username });
			if (user) {
				// If a user is found in the db, the username is already in use.
				throw new Error(`Username "${username}" is already in use.`);
			}
		}),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password must not be empty.')
		.isLength({ max: 20 })
		.withMessage('Password must be less than 20 characters.'),
	body('confirmPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Confirmation password must not be empty.')
		.custom((confirmPassword: string, { req }) => {
			// If the password and confirmation password do not match, throw an error.
			return confirmPassword === req.body.password;
		})
		.withMessage('Passwords do not match.')
		.isLength({ max: 20 })
		.withMessage('Confirmation password must be less than 20 characters.'),
];

// Store user in the database.
const storeUser = (user: HydratedDocument<IUser>) => {
	// Hash the user's password for security.
	bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
		if (err) {
			return err;
		} else {
			user.password = hashedPassword;
			await user.save();
		}
	});
};

// Create a user to be stored in the database.
export const userSignUpPost = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// Extract the validation errors from the request.
		const errors = validationResult(req);

		// Create a User object with escaped and trimmed data.
		const { username, password }: { username: string; password: string } =
			req.body;
		const user = new User({
			username: username,
			password: password,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with error messages.
			const errorMessages = errors.array().map((error) => error.msg);

			res.status(400).json({
				message: errorMessages,
			});
		} else {
			// There are no errors. Store the user in the database and return a success message.
			storeUser(user);
			res.status(201).json({
				message: [
					'Your account has been created. You will be redirected to log in.',
				],
			});
		}
	}
);

// Validate and sanitize fields from user on log in.
export const validateUserLogIn = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.isLength({ max: 20 })
		.withMessage('Username must be less than 20 characters.'),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password must not be empty.')
		.isLength({ max: 20 })
		.withMessage('Password must be less than 20 characters.'),
];

// Create an access and refresh token and store in Redis for future authentication.
const generateAndStoreToken = async (
	user: HydratedDocument<IUser>,
	res: Response
) => {
	// Create an access token for the user.
	const accessToken = jwt.sign(
		user.toJSON(),
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: '30m' }
	);

	// Create a refresh token for the user.
	const refreshToken = jwt.sign(
		user.toJSON(),
		process.env.REFRESH_TOKEN_SECRET!,
		{ expiresIn: '1h' }
	);

	// Store the tokens in Redis.
	await client.set('accessToken', accessToken);
	await client.set('refreshToken', refreshToken);

	// Return user info.
	res.status(200).json({
		username: user.username,
		profilePic: user.profilePic,
	});
};

// Checks input credentials against stored credentials to log user in.
export const userLogInPost = asyncHandler(async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// There are errors. Display error message to user.
		const errorMessages = errors.array().map((error) => error.msg);

		res.status(400).json({
			message: errorMessages,
		});
	} else {
		// There are no validation errors. Further check user credentials before logging in.
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });

		if (!user) {
			// User does not exist in database.
			res.status(401).json({
				message: [`Username "${username}" does not exist.`],
			});

			return;
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			// Input password and decrypted stored password do not match.
			res.status(401).json({
				message: ['Invalid password.'],
			});

			return;
		}

		// Anything below here is reached from a successful log in.

		generateAndStoreToken(user, res);
	}
});

export const getGoogleAccountInfo = passport.authenticate('google', {
	scope: ['email', 'profile'],
});

export const getGoogleCallback = passport.authenticate('google', {
	successRedirect: '/protected',
	failureRedirect: '/auth/failure',
});

// res.send('made it past authentication');
