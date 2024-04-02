import User from '../models/user';
import { body, validationResult } from 'express-validator';
import { IPlanner, IRecipe, IUser } from '../utils/types';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

// Validate and sanitize fields to create user on sign up.
export const validateUserSignUp = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.isLength({ max: 50 })
		.withMessage('Username must be less than 50 characters.')
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
		.isLength({ max: 50 })
		.withMessage('Password must be less than 50 characters.'),
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
		.isLength({ max: 50 })
		.withMessage('Confirmation password must be less than 50 characters.'),
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
		.isLength({ max: 50 })
		.withMessage('Username must be less than 50 characters.'),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password must not be empty.')
		.isLength({ max: 50 })
		.withMessage('Password must be less than 50 characters.'),
];

// Checks input credentials against stored credentials to log user in.
export const checkLogInValidationResult = asyncHandler(
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// There are errors. Display error message to user.
			const errorMessages = errors.array().map((error) => error.msg);

			res.status(400).json({
				message: errorMessages,
			});
		}

		// There are no errors, pass on to the next middleware.
		next();
	}
);

// Authenticate the user using passport local strategy.
export const authenticateUserLocal = (
	req: Request,
	res: Response,
	next: NextFunction
) =>
	passport.authenticate('local', function (err: any, user: any, info: any) {
		// If there is an error, pass on to next middleware.
		if (err) return next(err);

		/* There is not a user, an error has occurred in authentication. Return an error 
		message to the user for clarity. */
		if (!user) return res.status(401).json({ message: [info.message] });

		// Store the user in session manually.
		req.logIn(user, function (err) {
			if (err) return next(err);

			// No errors. Send response back to front end.
			return res.status(200).json(req.user);
		});
	})(req, res, next);

// Get a Google user's account info and pass through passport authentication.
export const getGoogleAccountInfo = passport.authenticate('google', {
	scope: ['email'],
});

// Called after successful Google authentication.
export const getGoogleCallback = passport.authenticate('google', {
	successRedirect: process.env.CLIENT_URI || 'http://localhost:5173',
	failureRedirect:
		`${process.env.CLIENT_URI}/log-in` || 'http://localhost:5173/log-in',
	failureFlash: true,
});

// Determine if the user has been authenticated and send response.
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	req.isAuthenticated() ? res.sendStatus(200) : res.sendStatus(403);
};

// Determine if the user has been authenticated and should be passed on to next middleware.
export const authenticateAndPass = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.isAuthenticated() ? next() : res.sendStatus(403);
};

// Determine is the has not been authenticated and should be allowed access.
export const isNotLoggedIn = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.isAuthenticated() ? res.sendStatus(403) : res.sendStatus(200);
};

// Remove user's credentials from request object to log user out.
export const logOutUser = (req: Request, res: Response, next: NextFunction) => {
	req.logOut((err) => {
		if (err) return next(err);
		res.sendStatus(200);
	});
};

// Save a recipe from a user in the db.
export const saveRecipe = asyncHandler(async (req, res, next) => {
	const { _id, recipes }: any = req.user;

	const { title, image, url, id } = req.body;

	/* If the user already has a stored recipe with a matching id, it is a duplicate.
	Do not store this recipe if it is a duplicate. */
	if (recipes.find((recipe: IRecipe) => recipe.id === id)) {
		res.status(409).send("Recipe already exists in user's stored recipes.");
	} else {
		const recipe = {
			title: title,
			image: image,
			url: url,
			id: id,
			timestamp: Date.now(),
		};

		await User.findOneAndUpdate({ _id: _id }, { $push: { recipes: recipe } });

		res.sendStatus(200);
	}
});

// Return stored recipes from a user in the db.
export const getRecipes = asyncHandler(async (req, res, next) => {
	const { recipes }: any = req.user;

	// Sort recipes in order they were saved.
	recipes.sort((a: IRecipe, b: IRecipe) => {
		if (a.timestamp > b.timestamp) {
			return -1;
		} else {
			return 1;
		}
	});

	res.json({
		recipes: recipes,
	});
});

// Delete the stored recipe from the db.
export const deleteRecipe = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const recipeId = req.params.id;

	const user = await User.findOneAndUpdate(
		{ _id: _id },
		{ $pull: { recipes: { _id: recipeId } } },
		{ returnDocument: 'after' }
	);

	res.json({ recipes: user?.recipes });
});

// Store ingredients from the user's form.
export const storeIngredients = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const { ingredients } = req.body;

	await User.findOneAndUpdate({ _id: _id }, { ingredients: ingredients });

	res.json({ ingredients: ingredients });
});

// Return the stored planner for a user from the db.
export const getPlanner = asyncHandler(async (req, res, next) => {
	const { planner }: any = req.user;

	res.json({ planner: planner });
});

// Store a recipe in the user's planner.
export const storeRecipeInPlanner = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const { recipes }: any = req.user;
	const { planner }: any = req.user;
	const recipeId = req.params.id;
	const day = req.params.day.toLowerCase();

	// Find the recipe information from the stored recipes from the user.
	const recipe = recipes.find(
		(recipe: IRecipe) => recipe._id?.toString() === recipeId
	);

	/* If there is a recipe already stored in the planner for the day the user 
	has selected, do not allow the recipe to be stored in the planner. */
	if (planner.find((meal: IPlanner) => meal.day === day)) {
		res
			.status(409)
			.send(`There is already a recipe stored in the planner on "${day}"`);
	} else {
		const user = await User.findOneAndUpdate(
			{ _id: _id },
			{ $push: { planner: { day: day, recipe: recipe } } },
			{ returnDocument: 'after' }
		);

		res.json({ planner: user?.planner });
	}
});

// Deletes the recipe from the user's planner.
export const deleteRecipeFromPlanner = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const mealId = req.params.id;

	const user = await User.findOneAndUpdate(
		{ _id: _id },
		{ $pull: { planner: { _id: mealId } } },
		{ returnDocument: 'after' }
	);

	res.json({ planner: user?.planner });
});

// Clear planner of all recipes.
export const clearPlanner = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;

	const user = await User.findOneAndUpdate(
		{ _id: _id },
		{ planner: [] },
		{ returnDocument: 'after' }
	);

	res.json({ planner: user?.planner });
});
