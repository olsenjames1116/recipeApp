import { configureStore } from '@reduxjs/toolkit';
import randomRecipeReducer from './state/randomRecipeSlice';
import recipeTypeReducer from './state/recipeTypeSlice';
import allIngredientsReducer from './state/allIngredientsSlice';
import userIngredientsReducer from './state/userIngredientsSlice';
import searchIngredientsReducer from './state/searchIngredientsSlice';
import recipeListReducer from './state/recipeListSlice';
import selectedDayReducer from './state/selectedDaySlice';

export const store = configureStore({
	reducer: {
		randomRecipe: randomRecipeReducer,
		recipeType: recipeTypeReducer,
		allIngredients: allIngredientsReducer,
		userIngredients: userIngredientsReducer,
		searchIngredients: searchIngredientsReducer,
		recipeList: recipeListReducer,
		selectedDay: selectedDayReducer,
	},
});

export type IRootState = ReturnType<typeof store.getState>;
