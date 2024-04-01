import { createSlice } from '@reduxjs/toolkit';

// Represents the string for the day of the week selected for the meal planner.
export const selectedDaySlice = createSlice({
	name: 'selectedDay',
	initialState: {
		value: '',
	},
	reducers: {
		addSelectedDay: (state, action) => {
			return { value: action.payload };
		},
		removeSelectedDay: () => {
			return { value: '' };
		},
	},
});

export const { addSelectedDay, removeSelectedDay } = selectedDaySlice.actions;
export default selectedDaySlice.reducer;
