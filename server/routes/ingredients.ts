import express from 'express';
const router = express.Router();
import { authenticateAndPass } from '../controllers/userController';
import { getIngredients } from '../controllers/ingredientsController';

router.get('/', authenticateAndPass, getIngredients);

export default router;
