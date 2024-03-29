import asyncHandler from 'express-async-handler';
import Ingredient from '../models/ingredient';

export const getIngredients = asyncHandler(async (req, res, next) => {
	const { ingredients }: any = req.user;

	const allStoredIngredients = await Ingredient.find().sort({ name: 1 });

	res.json({
		userIngredients: ingredients,
		allStoredIngredients: allStoredIngredients,
	});
});
