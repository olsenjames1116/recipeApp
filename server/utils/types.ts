import { Types } from 'mongoose';

export interface IRecipe {
	title: string;
	image: string;
	url: string;
}

export interface IUser {
	username: string;
	password: string;
	recipes: IRecipe[];
	ingredients: Types.ObjectId[];
}
