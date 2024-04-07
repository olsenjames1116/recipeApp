import { createSlice } from '@reduxjs/toolkit';

// Represents the random recipe retrieved from Spoonacular api.
export const randomRecipeSlice = createSlice({
	name: 'randomRecipe',
	initialState: {
		value: {},
	},
	reducers: {
		addRandomRecipe: (_state, action) => {
			return { value: { ...action.payload } };
		},
		removeRandomRecipe: () => {
			return { value: {} };
		},
	},
});

export const { addRandomRecipe, removeRandomRecipe } =
	randomRecipeSlice.actions;
export default randomRecipeSlice.reducer;
