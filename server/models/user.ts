import { Schema, model, Types, Model } from 'mongoose';
import { IUser } from '../utils/types';

type UserModel = Model<IUser>;

// Schema for a user document in MongoDB.
const UserSchema = new Schema<IUser, UserModel>({
	username: { type: String, required: true, maxLength: 50 },
	password: { type: String },
	recipes: [
		{
			title: { type: String },
			image: { type: String },
			url: { type: String },
			id: { type: Number },
			timestamp: { type: Date },
		},
	],
	ingredients: [{ type: Types.ObjectId, ref: 'Ingredient' }],
	planner: [
		{
			day: { type: String },
			recipe: {
				title: { type: String },
				image: { type: String },
				url: { type: String },
				id: { type: Number },
				timestamp: { type: Date },
			},
		},
	],
});

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
