import FoodJoke from '../FoodJoke/FoodJoke';
import RandomRecipe from '../RandomRecipe/RandomRecipe';
import FoodFact from '../FoodFact/FoodFact';
import { useEffect, useState } from 'react';

// Represents the recipe generator for the Spoonacular api.
function GenerateRecipes() {
	const [randomChoice, setRandomChoice] = useState(0);

	useEffect(() => {
		// Generate a random number to display either a joke or a fact.
		setRandomChoice(Math.round(Math.random()));
	}, []);

	return (
		<div>
			{randomChoice > 0.5 ? <FoodJoke /> : <FoodFact />}
			Select an option below to generate recipes <RandomRecipe />
		</div>
	);
}

export default GenerateRecipes;
