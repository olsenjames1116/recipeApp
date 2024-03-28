import FoodJoke from '../FoodJoke/FoodJoke';
import RandomRecipe from '../RandomRecipe/RandomRecipe';

function GenerateRecipes() {
	return (
		<div>
			<FoodJoke />
			Select an option below to generate recipes <RandomRecipe />
		</div>
	);
}

export default GenerateRecipes;
