export interface IRecipe {
	title?: string;
	image?: string;
	url?: string;
}

export interface IRecipeWithId extends IRecipe {
	_id: string;
}
