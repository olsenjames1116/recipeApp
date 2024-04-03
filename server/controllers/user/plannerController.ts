import asyncHandler from 'express-async-handler';
import { IRecipe, IPlanner } from '../../utils/types';
import User from '../../models/user';

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
