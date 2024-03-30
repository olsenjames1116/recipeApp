import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { IRecipe } from '../../types';
import NextRecipe from '../NextRecipe/NextRecipe';
import SaveRecipe from '../SaveRecipe/SaveRecipe';
import { useNavigate } from 'react-router-dom';

// Represents a recipe generated from Spoonacular api.
function GeneratedRecipe() {
	const randomRecipe: IRecipe = useSelector(
		(state: IRootState) => state.randomRecipe.value
	);

	const navigate = useNavigate();

	// Start search over by reloading page.
	const startOver = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		navigate(0);
	};

	return (
		<div>
			<a href={randomRecipe.url} target="_blank">
				<img src={randomRecipe.image} />
				<span>{randomRecipe.title}</span>
			</a>
			<NextRecipe />
			<SaveRecipe />
			<button onClick={startOver}>Start Over</button>
		</div>
	);
}

export default GeneratedRecipe;
