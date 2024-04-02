import asyncHandler from 'express-async-handler';
import Ingredient from '../models/ingredient';
import User from '../models/user';

// Get all ingredients stored in the ingredients collection.
export const getIngredients = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;

	const allStoredIngredients = await Ingredient.find().sort({ name: 1 });

	const user = await User.findOne({ _id: _id }).populate('ingredients');

	res.json({
		userIngredients: user?.ingredients,
		allStoredIngredients: allStoredIngredients,
	});
});
