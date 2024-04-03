import {
	validateUserSignUp,
	userSignUpPost,
	validateUserLogIn,
	checkLogInValidationResult,
	authenticateUserLocal,
	getGoogleAccountInfo,
	getGoogleCallback,
	isLoggedIn,
	authenticateAndPass,
	isNotLoggedIn,
	logOutUser,
} from './authenticationController';
import { saveRecipe, getRecipes, deleteRecipe } from './recipeController';
import { storeIngredients, getUserIngredients } from './ingredientsController';
import {
	getPlanner,
	storeRecipeInPlanner,
	deleteRecipeFromPlanner,
	clearPlanner,
} from './plannerController';
import {
	validateGroceryItem,
	storeGroceryItem,
	getGroceries,
	storeCheckedItem,
	deleteGrocery,
	clearGroceries,
} from './groceriesController';

// Consolidate and export user controller methods.
export {
	validateUserSignUp,
	userSignUpPost,
	validateUserLogIn,
	checkLogInValidationResult,
	authenticateUserLocal,
	getGoogleAccountInfo,
	getGoogleCallback,
	isLoggedIn,
	authenticateAndPass,
	isNotLoggedIn,
	logOutUser,
	saveRecipe,
	getRecipes,
	deleteRecipe,
	storeIngredients,
	getUserIngredients,
	getPlanner,
	storeRecipeInPlanner,
	deleteRecipeFromPlanner,
	clearPlanner,
	validateGroceryItem,
	storeGroceryItem,
	getGroceries,
	storeCheckedItem,
	deleteGrocery,
	clearGroceries,
};
