import asyncHandler from 'express-async-handler';
import { IRecipe } from '../../utils/types';
import User from '../../models/user';

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
