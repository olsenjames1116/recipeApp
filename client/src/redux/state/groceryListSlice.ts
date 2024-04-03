import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: string[] } = { value: [] };

// Represents all the groceries stored for a user in the db.
export const groceryListSlice = createSlice({
	name: 'groceryList',
	initialState,
	reducers: {
		addGroceries: (state, action) => {
			return { value: [...action.payload] };
		},
		removeGroceries: () => {
			return { value: [] };
		},
	},
});

export const { addGroceries, removeGroceries } = groceryListSlice.actions;
export default groceryListSlice.reducer;
