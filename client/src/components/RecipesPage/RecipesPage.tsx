import { useEffect } from 'react';
import Header from '../Header/Header';
import RecipesContent from '../RecipesContent/RecipesContent';
import styles from './RecipesPage.module.scss';

// Represents the recipes page for users to view saved recipes.
function RecipesPage() {
	useEffect(() => {
		document.title = 'Saved Recipes';
	}, []);

	return (
		<div className={styles.page} data-testid="recipes-page">
			<Header location="recipes" />
			<RecipesContent />
		</div>
	);
}

export default RecipesPage;
