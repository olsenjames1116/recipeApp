import { createSlice } from '@reduxjs/toolkit';
import { IIngredientWithId } from '../../types';

const initialState: { value: IIngredientWithId[] } = {
	value: [],
};

// Represents all ingredients stored in a user's account.
export const userIngredientsSlice = createSlice({
	name: 'userIngredients',
	initialState,
	reducers: {
		addUserIngredients: (state, action) => {
			return { value: [...action.payload] };
		},
		removeUserIngredients: () => {
			return { value: [] };
		},
	},
});

export const { addUserIngredients, removeUserIngredients } =
	userIngredientsSlice.actions;
export default userIngredientsSlice.reducer;
