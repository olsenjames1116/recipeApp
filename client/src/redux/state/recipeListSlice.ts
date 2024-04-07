import { createSlice } from '@reduxjs/toolkit';
import { IRecipeWithId } from '../../types';

const initialState: { value: IRecipeWithId[] } = {
	value: [],
};

// Represents the recipes a user has stored.
export const recipeListSlice = createSlice({
	name: 'recipeList',
	initialState,
	reducers: {
		addRecipeList: (_state, action) => {
			return { value: [...action.payload] };
		},
		removeRecipeList: () => {
			return { value: [] };
		},
	},
});

export const { addRecipeList, removeRecipeList } = recipeListSlice.actions;
export default recipeListSlice.reducer;
