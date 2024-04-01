import { createSlice } from '@reduxjs/toolkit';

// Represents the query string to search for a recipe from stored recipes.
export const recipesQuerySlice = createSlice({
	name: 'recipesQuery',
	initialState: {
		value: '',
	},
	reducers: {
		addRecipesQuery: (state, action) => {
			return { value: action.payload };
		},
		removeRecipesQuery: () => {
			return { value: '' };
		},
	},
});

export const { addRecipesQuery, removeRecipesQuery } =
	recipesQuerySlice.actions;
export default recipesQuerySlice.reducer;
