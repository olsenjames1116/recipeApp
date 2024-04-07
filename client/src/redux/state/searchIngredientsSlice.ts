import { createSlice } from '@reduxjs/toolkit';

// Represents the string of values with ingredients to search api for.
export const searchIngredientsSlice = createSlice({
	name: 'searchIngredients',
	initialState: {
		value: '',
	},
	reducers: {
		addSearchIngredients: (_state, action) => {
			return { value: action.payload };
		},
		removeSearchIngredients: () => {
			return { value: '' };
		},
	},
});

export const { addSearchIngredients, removeSearchIngredients } =
	searchIngredientsSlice.actions;
export default searchIngredientsSlice.reducer;
