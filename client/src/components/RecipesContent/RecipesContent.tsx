import RecipeList from '../RecipeList/RecipeList';
import styles from './RecipesContent.module.scss';

// Represents the main content for the recipes page.
function RecipesContent() {
	return (
		<main className={styles.main}>
			<RecipeList />
		</main>
	);
}

export default RecipesContent;
