import { Schema, model, Types } from 'mongoose';

interface Recipe {
	title: string;
	image: string;
	url: string;
}

interface User {
	username: string;
	password: string;
	profilePic: string;
	recipes: Recipe[];
	ingredients: Types.ObjectId[];
}

// Schema for a user document in MongoDB.
const UserSchema = new Schema({
	username: { type: String, required: true, maxLength: 20 },
	password: { type: String, required: true, maxLength: 20 },
	profilePic: {
		type: String,
		required: true,
		default:
			'https://res.cloudinary.com/dszhwrjnv/image/upload/v1711239497/recipeApp/user_jsbgqr.png',
	},
	recipes: [
		{
			title: { type: String },
			image: { type: String },
			url: { type: String },
		},
	],
	ingredients: [{ type: Types.ObjectId, ref: 'Ingredient' }],
});

export default model('User', UserSchema);
