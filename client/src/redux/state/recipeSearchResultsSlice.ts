import { createSlice } from '@reduxjs/toolkit';
import { IRecipeWithId } from '../../types';

const initialState: { value: IRecipeWithId[] } = {
	value: [],
};

// Represents the recipes returned from a search query.
export const recipeSearchResultsSlice = createSlice({
	name: 'recipeSearchResults',
	initialState,
	reducers: {
		addRecipeSearchResults: (_state, action) => {
			return { value: [...action.payload] };
		},
		removeRecipeSearchResults: () => {
			return { value: [] };
		},
	},
});

export const { addRecipeSearchResults, removeRecipeSearchResults } =
	recipeSearchResultsSlice.actions;
export default recipeSearchResultsSlice.reducer;
