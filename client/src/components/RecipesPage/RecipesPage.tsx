import { useEffect } from 'react';
import Header from '../Header/Header';
import RecipesContent from '../RecipesContent/RecipesContent';

// Represents the recipes page for users to view saved recipes.
function RecipesPage() {
	useEffect(() => {
		document.title = 'Saved Recipes';
	}, []);

	return (
		<main>
			<Header />
			<RecipesContent />
		</main>
	);
}

export default RecipesPage;
