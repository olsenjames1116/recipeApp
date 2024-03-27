import { createSlice } from '@reduxjs/toolkit';

// Represents the source for the random recipe.
export const recipeTypeSlice = createSlice({
	name: 'recipeType',
	initialState: {
		value: '',
	},
	reducers: {
		addRecipeType: (state, action) => {
			return { value: action.payload };
		},
		removeRecipeType: () => {
			return { value: '' };
		},
	},
});

export const { addRecipeType, removeRecipeType } = recipeTypeSlice.actions;
export default recipeTypeSlice.reducer;
