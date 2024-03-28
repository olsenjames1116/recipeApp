import asyncHandler from 'express-async-handler';

export const getIngredients = asyncHandler(async (req, res, next) => {
	const { ingredients }: any = req.user;
});
