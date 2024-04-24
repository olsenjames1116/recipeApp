export interface IRecipe {
	title?: string;
	image?: string;
	url?: string;
	id?: number;
	timestamp?: Date;
}

export interface IRecipeWithId extends IRecipe {
	_id: string;
}

export interface IIngredientWithId {
	_id: string;
	name: string;
}

export interface IPlanner {
	day: string;
	recipe: IRecipe;
	_id?: string;
}

export interface IGrocery {
	name: string;
	checked: boolean;
	_id?: string;
}

export interface SignUpInterface {
	username?: string;
	password?: string;
	confirmPassword?: string;
}

export interface LogInInterface {
	username?: string;
	password?: string;
}
