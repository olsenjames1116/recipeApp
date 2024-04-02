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
}
