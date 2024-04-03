import express from 'express';
const router = express.Router();
import { authenticateAndPass } from '../controllers/user/userController';
import { getIngredients } from '../controllers/ingredients/ingredientsController';

// GET all ingredients stored in the db.
router.get('/', authenticateAndPass, getIngredients);

export default router;
