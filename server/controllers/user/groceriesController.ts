import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import User from '../../models/user';

// Validate grocery item input.
export const validateGroceryItem = [
	body('item')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Item input must not be empty.')
		.isLength({ max: 50 })
		.withMessage('Item input must be less than 50 characters.'),
];

// Store a grocery item for the user in the db.
export const storeGroceryItem = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from the request.
	const errors = validationResult(req);

	const { _id }: any = req.user;
	const { item } = req.body;

	if (!errors.isEmpty()) {
		// There are errors. Render form again with error messages.
		const errorMessages = errors.array().map((error) => error.msg);

		res.status(400).json({
			message: errorMessages,
		});
	} else {
		// There are no errors. Store the grocery item in the db.
		const user = await User.findByIdAndUpdate(
			{ _id: _id },
			{ $push: { groceries: { name: item, checked: false } } },
			{ returnDocument: 'after' }
		);

		res.json({ groceries: user?.groceries });
	}
});

// Retrieve the stored groceries for a user.
export const getGroceries = asyncHandler(async (req, res, next) => {
	const { groceries }: any = req.user;

	res.json({ groceries: groceries });
});

// Store the change to the checked attribute for a grocery item.
export const storeCheckedItem = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const itemId = req.body.id;
	const { checked } = req.body;

	const user = await User.findOneAndUpdate(
		{ _id: _id, 'groceries._id': `${itemId}` },
		{
			$set: { 'groceries.$.checked': checked },
		},
		{ returnDocument: 'after' }
	);

	res.json({ groceries: user?.groceries });
});

// Delete the specified grocery item from user's profile.
export const deleteGrocery = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;
	const itemId = req.params.id;

	const user = await User.findOneAndUpdate(
		{ _id: _id },
		{ $pull: { groceries: { _id: itemId } } },
		{ returnDocument: 'after' }
	);

	res.json({ groceries: user?.groceries });
});

// Delete all items from a user's grocery list.
export const clearGroceries = asyncHandler(async (req, res, next) => {
	const { _id }: any = req.user;

	const user = await User.findOneAndUpdate(
		{ _id: _id },
		{ groceries: [] },
		{ returnDocument: 'after' }
	);

	res.json({ groceries: user?.groceries });
});
