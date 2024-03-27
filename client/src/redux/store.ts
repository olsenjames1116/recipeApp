import { configureStore } from '@reduxjs/toolkit';
import randomRecipeReducer from './state/randomRecipeSlice';

export default configureStore({
	reducer: {
		randomRecipe: randomRecipeReducer,
	},
});
