import { useSelector } from 'react-redux';
import GenerateRecipes from '../GenerateRecipes/GenerateRecipes';
import { IRootState } from '../../redux/store';
import GeneratedRecipe from '../GeneratedRecipe/GeneratedRecipe';
import { useState } from 'react';
import IngredientSearchMenu from '../IngredientSearchMenu/IngredientSearchMenu';

interface HomeContentProps {
	menuRef: React.RefObject<HTMLDivElement>;
}

// Represents the content displayed on the home page.
function HomeContent({ menuRef }: HomeContentProps) {
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
					menuRef={menuRef}
					displayMenu={displayMenu}
					setDisplayMenu={setDisplayMenu}
				/>
			)}
		</main>
	);
}

export default HomeContent;
