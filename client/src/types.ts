export interface IRecipe {
	title?: string;
	image?: string;
	url?: string;
}

export interface IRecipeWithId extends IRecipe {
	_id: string;
}

export interface IIngredientWithId {
	_id: string;
	name: string;
}
