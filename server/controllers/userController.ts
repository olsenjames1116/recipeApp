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
		.withMessage('Username must not be empty.'),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password must not be empty.'),
	body('confirmPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Confirmation password must not be empty.'),
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

		if (!errors.isEmpty()) {
			console.log(errors);
		} else {
			console.log(
				`username: ${req.body.username} password: ${req.body.password} confirmPassword: ${req.body.confirmPassword}`
			);
		}
	}
);
