import { configureStore } from '@reduxjs/toolkit';
import randomRecipeReducer from './state/randomRecipeSlice';
import recipeTypeReducer from './state/recipeTypeSlice';
import allIngredientsReducer from './state/allIngredientsSlice';
import userIngredientsReducer from './state/userIngredientsSlice';
import searchIngredientsReducer from './state/searchIngredientsSlice';
import recipeListReducer from './state/recipeListSlice';
import selectedDayReducer from './state/selectedDaySlice';
import recipesQueryReducer from './state/recipesQuerySlice';
import recipeSearchResultsReducer from './state/recipeSearchResultsSlice';
import plannerSliceReducer from './state/plannerSlice';
import groceryListReducer from './state/groceryListSlice';

export const store = configureStore({
	reducer: {
		randomRecipe: randomRecipeReducer,
		recipeType: recipeTypeReducer,
		allIngredients: allIngredientsReducer,
		userIngredients: userIngredientsReducer,
		searchIngredients: searchIngredientsReducer,
		recipeList: recipeListReducer,
		selectedDay: selectedDayReducer,
		recipesQuery: recipesQueryReducer,
		recipeSearchResults: recipeSearchResultsReducer,
		planner: plannerSliceReducer,
		groceryList: groceryListReducer,
	},
});

export type IRootState = ReturnType<typeof store.getState>;
