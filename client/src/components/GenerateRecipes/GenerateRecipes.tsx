import FoodJoke from '../FoodJoke/FoodJoke';
import RandomRecipe from '../RandomRecipe/RandomRecipe';
import FoodFact from '../FoodFact/FoodFact';
import { useEffect, useState } from 'react';
import RandomRecipeWithIngredients from '../RandomRecipeWithIngredients/RandomRecipeWithIngredients';

interface GenerateRecipesProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the recipe generator for the Spoonacular api.
function GenerateRecipes({ setDisplayMenu }: GenerateRecipesProps) {
	const [randomChoice, setRandomChoice] = useState(0);

	useEffect(() => {
		// Generate a random number to display either a joke or a fact.
		setRandomChoice(Math.round(Math.random()));
	}, []);

	return (
		<div>
			{randomChoice > 0.5 ? <FoodJoke /> : <FoodFact />}
			Select an option below to generate recipes <RandomRecipe /> or{' '}
			<RandomRecipeWithIngredients setDisplayMenu={setDisplayMenu} />
		</div>
	);
}

export default GenerateRecipes;
