import { configureStore } from '@reduxjs/toolkit';
import randomRecipeReducer from './state/randomRecipeSlice';
import recipeTypeReducer from './state/recipeTypeSlice';
import allIngredientsReducer from './state/allIngredientsSlice';
import userIngredientsReducer from './state/userIngredientsSlice';

export const store = configureStore({
	reducer: {
		randomRecipe: randomRecipeReducer,
		recipeType: recipeTypeReducer,
		allIngredients: allIngredientsReducer,
		userIngredients: userIngredientsReducer,
	},
});

export type IRootState = ReturnType<typeof store.getState>;
