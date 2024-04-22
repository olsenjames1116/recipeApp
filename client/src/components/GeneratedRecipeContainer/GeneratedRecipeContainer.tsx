import GeneratedRecipeInfo from '../GeneratedRecipeInfo/GeneratedRecipeInfo';
import NextRecipe from '../NextRecipe/NextRecipe';
import SaveRecipe from '../SaveRecipe/SaveRecipe';
import styles from './GeneratedRecipeContainer.module.scss';

/* Represents the container that holds generated recipe info and icons 
for user interaction. */
function GeneratedRecipeContainer() {
	return (
		<div
			className={styles.recipeContainer}
			data-testid="generated-recipe-container"
		>
			<GeneratedRecipeInfo />
			<div className={styles.iconContainer}>
				<NextRecipe />
				<SaveRecipe />
			</div>
		</div>
	);
}

export default GeneratedRecipeContainer;
