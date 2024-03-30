import { useSelector } from 'react-redux';
import GenerateRecipes from '../GenerateRecipes/GenerateRecipes';
import { IRootState } from '../../redux/store';
import GeneratedRecipe from '../GeneratedRecipe/GeneratedRecipe';
import { useState } from 'react';
import IngredientSearchMenu from '../IngredientSearchMenu/IngredientSearchMenu';

// Represents the content displayed on the home page.
function HomeContent() {
	const randomRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	const [displayMenu, setDisplayMenu] = useState(false);

	return (
		<main>
			{Object.keys(randomRecipe).length === 0 ? (
				<GenerateRecipes setDisplayMenu={setDisplayMenu} />
			) : (
				<GeneratedRecipe />
			)}
			{displayMenu && (
				<IngredientSearchMenu
					displayMenu={displayMenu}
					setDisplayMenu={setDisplayMenu}
				/>
			)}
		</main>
	);
}

export default HomeContent;
