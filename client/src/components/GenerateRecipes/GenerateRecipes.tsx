import RandomRecipe from '../RandomRecipe/RandomRecipe';
import FoodFact from '../FoodFact/FoodFact';
import RandomRecipeWithIngredients from '../RandomRecipeWithIngredients/RandomRecipeWithIngredients';
import styles from './GenerateRecipes.module.scss';

interface GenerateRecipesProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Represents the recipe generator for the Spoonacular api.
function GenerateRecipes({ setDisplayMenu }: GenerateRecipesProps) {
	return (
		<div className={styles.container} data-testid="generate-recipes">
			<FoodFact />
			Select an option below to generate recipes <RandomRecipe /> or{' '}
			<RandomRecipeWithIngredients setDisplayMenu={setDisplayMenu} />
		</div>
	);
}

export default GenerateRecipes;
