import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { IRecipe } from '../../types';

// Represents the info for the random recipe retrieved from Spoonacular api.
function GeneratedRecipeInfo() {
	const randomRecipe: IRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	return (
		<a href={randomRecipe.url} target="_blank">
			<img src={randomRecipe.image} alt="" />
			<span>{randomRecipe.title}</span>
		</a>
	);
}

export default GeneratedRecipeInfo;
