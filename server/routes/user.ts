import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user/userController';

// POST a new user to validate and sign them up.
router.post(
	'/sign-up',
	userController.validateUserSignUp,
	userController.userSignUpPost
);

// POST a user's credentials to validate and log them in.
router.post(
	'/log-in',
	userController.validateUserLogIn,
	userController.checkLogInValidationResult,
	userController.authenticateUserLocal
);

// GET account info from Google OAuth.
router.get('/auth/google', userController.getGoogleAccountInfo);

// GET callback function after Google user is authenticated.
router.get('/auth/google/callback', userController.getGoogleCallback);

// GET authentication to ensure logged in user can access page.
router.get('/authenticate', userController.isLoggedIn);

// GET authentication to ensure a logged in user cannot access page.
router.get('/logged-out', userController.isNotLoggedIn);

// DELETE the authentication details from request to log user out.
router.delete('/log-out', userController.logOutUser);

// POST a recipe to a user in the db.
router.post(
	'/save-recipe',
	userController.authenticateAndPass,
	userController.saveRecipe
);

// GET stored recipes for a user.
router.get(
	'/recipes',
	userController.authenticateAndPass,
	userController.getRecipes
);

// DELETE stored recipe from a user.
router.delete(
	'/recipe/:id',
	userController.authenticateAndPass,
	userController.deleteRecipe
);

// POST ingredients to user's account in db.
router.post(
	'/store-ingredients',
	userController.authenticateAndPass,
	userController.storeIngredients
);

// GET a user's stored ingredients.
router.get(
	'/saved-ingredients',
	userController.authenticateAndPass,
	userController.getUserIngredients
);

// POST a recipe to a user's planner.
router.post(
	'/store-in-planner/:day/:id',
	userController.authenticateAndPass,
	userController.storeRecipeInPlanner
);

// GET the planner stored in the db for the user.
router.get(
	'/planner',
	userController.authenticateAndPass,
	userController.getPlanner
);

// DELETE a recipe from the user's planner.
router.delete(
	'/planner/:id',
	userController.authenticateAndPass,
	userController.deleteRecipeFromPlanner
);

// DELETE all recipes from a user's planner.
router.delete(
	'/clear-planner',
	userController.authenticateAndPass,
	userController.clearPlanner
);

// POST a grocery item to the user's profile.
router.post(
	'/save-grocery-item',
	userController.authenticateAndPass,
	userController.validateGroceryItem,
	userController.storeGroceryItem
);

// GET the stored groceries from a user.
router.get(
	'/groceries',
	userController.authenticateAndPass,
	userController.getGroceries
);

// POST checked attribute to a grocery item.
router.post(
	'/grocery',
	userController.authenticateAndPass,
	userController.storeCheckedItem
);

// DELETE grocery item from user's list.
router.delete(
	'/grocery/:id',
	userController.authenticateAndPass,
	userController.deleteGrocery
);

// DELETE all items from a user's grocery list.
router.delete(
	'/groceries',
	userController.authenticateAndPass,
	userController.clearGroceries
);

export default router;
