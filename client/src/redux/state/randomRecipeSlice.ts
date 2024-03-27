import { createSlice } from '@reduxjs/toolkit';

export const randomRecipeSlice = createSlice({
	name: 'randomRecipe',
	initialState: {
		value: {},
	},
	reducers: {},
});

export default randomRecipeSlice.reducer;
