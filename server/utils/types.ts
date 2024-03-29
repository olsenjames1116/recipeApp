import { Types } from 'mongoose';

export interface IRecipe {
	title: string;
	image: string;
	url: string;
	id: number;
}

export interface IUser {
	username: string;
	password: string;
	recipes: IRecipe[];
	ingredients: Types.ObjectId[];
	_id?: Types.ObjectId;
}

export interface IIngredient {
	name: string;
}
