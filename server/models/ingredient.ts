import { Schema, model, Model } from 'mongoose';
import { IIngredient } from '../utils/types';

type IngredientModel = Model<IIngredient>;

// Schema for an ingredient document in MongoDB.
const IngredientSchema = new Schema<IIngredient, IngredientModel>({
	name: { type: String, required: true },
});

const Ingredient = model<IIngredient, IngredientModel>(
	'Ingredient',
	IngredientSchema
);

export default Ingredient;
