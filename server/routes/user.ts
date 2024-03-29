import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController';

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

export default router;
