import { createSlice } from '@reduxjs/toolkit';
import { IPlanner } from '../../types';

const initialState: { value: IPlanner[] } = {
	value: [],
};

// Represents the planner that shows the user's recipes on a given day.
export const plannerSlice = createSlice({
	name: 'planner',
	initialState,
	reducers: {
		addPlanner: (state, action) => {
			return { value: [...action.payload] };
		},
		removePlanner: () => {
			return { value: [] };
		},
	},
});

export const { addPlanner, removePlanner } = plannerSlice.actions;
export default plannerSlice.reducer;
