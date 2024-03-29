import { createSlice } from '@reduxjs/toolkit';
import { IIngredientWithId } from '../../types';

const initialState: { value: IIngredientWithId[] } = {
	value: [],
};

// Represents all the ingredients retrieved from the db.
export const allIngredientsSlice = createSlice({
	name: 'allIngredients',
	initialState,
	reducers: {
		addAllIngredients: (state, action) => {
			return { value: [...action.payload] };
		},
		removeAllIngredients: () => {
			return { value: [] };
		},
	},
});

export const { addAllIngredients, removeAllIngredients } =
	allIngredientsSlice.actions;
export default allIngredientsSlice.reducer;
