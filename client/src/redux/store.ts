import { configureStore } from '@reduxjs/toolkit';
import randomRecipeReducer from './state/randomRecipeSlice';

export const store = configureStore({
	reducer: {
		randomRecipe: randomRecipeReducer,
	},
});

export type IRootState = ReturnType<typeof store.getState>;
