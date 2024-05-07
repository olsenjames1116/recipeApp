import asyncHandler from 'express-async-handler';
import User from '../../models/user';

// Store ingredients from the user's form.
export const storeIngredients = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const { ingredients } = req.body;

	const user = await User.findOneAndUpdate(
		{ _id: _id },
		{ ingredients: ingredients },
		{ returnDocument: 'after' }
	).populate('ingredients');

	res.status(201).json({ ingredients: user?.ingredients });
});

// Retrieve ingredients the user has stored.
export const getUserIngredients = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;

	const user = await User.findOne({ _id: _id }).populate('ingredients');

	res.status(200).json({ ingredients: user?.ingredients });
});
