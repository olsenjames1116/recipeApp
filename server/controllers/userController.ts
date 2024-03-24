import User from '../models/user';
import { body, validationResult } from 'express-validator';
import { IUser } from '../utils/types';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

// Validate and sanitize fields to create user on sign up.
export const validateUserSignUp = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.custom(async (username: string) => {
			const user = await User.findOne({ username: username });
			if (user) {
				// If a user is found in the db, the username is already in use.
				throw new Error(`Username ${username} is already in use.`);
			}
		}),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password must not be empty.'),
	body('confirmPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Confirmation password must not be empty.')
		.custom((confirmPassword: string, { req }) => {
			// If the password and confirmation password do not match, throw an error.
			return confirmPassword === req.body.password;
		})
		.withMessage('Passwords do not match.'),
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
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
			res.status(201).json({
				message:
					'Your account has been created. You will be redirected to log in.',
			});
		}
	}
);
