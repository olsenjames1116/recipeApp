import { useSelector } from 'react-redux';
import GenerateRecipes from '../GenerateRecipes/GenerateRecipes';
import { IRootState } from '../../redux/store';
import GeneratedRecipe from '../GeneratedRecipe/GeneratedRecipe';

function HomeContent() {
	const randomRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	console.log(Object.keys(randomRecipe));

	return (
		<main>
			{Object.keys(randomRecipe).length === 0 ? (
				<GenerateRecipes />
			) : (
				<GeneratedRecipe />
			)}
		</main>
	);
}

export default HomeContent;
