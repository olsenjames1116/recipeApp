import { Types } from 'mongoose';

export interface IRecipe {
	title: string;
	image: string;
	url: string;
	id: number;
	timestamp: Date;
	_id?: Types.ObjectId;
}

export interface IPlanner {
	day: string;
	recipe: IRecipe;
}

export interface IUser {
	username: string;
	password: string;
	recipes: IRecipe[];
	ingredients: Types.ObjectId[];
	_id?: Types.ObjectId;
	planner: IPlanner[];
	groceries: string[];
}

export interface IIngredient {
	name: string;
}
