import express from 'express';
const router = express.Router();
import { authenticateAndPass } from '../controllers/userController';
import { getIngredients } from '../controllers/ingredientsController';

// GET all ingredients stored in the db.
router.get('/', authenticateAndPass, getIngredients);

export default router;
