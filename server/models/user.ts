import { Schema, model, Types, Model } from 'mongoose';
import { IUser } from '../utils/types';

type UserModel = Model<IUser>;

// Schema for a user document in MongoDB.
const UserSchema = new Schema<IUser, UserModel>({
	username: { type: String, required: true, maxLength: 20 },
	password: { type: String, required: true },
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

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
