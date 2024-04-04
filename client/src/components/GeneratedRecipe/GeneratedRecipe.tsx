import GeneratedRecipeInfo from '../GeneratedRecipeInfo/GeneratedRecipeInfo';
import NextRecipe from '../NextRecipe/NextRecipe';
import SaveRecipe from '../SaveRecipe/SaveRecipe';
import { useNavigate } from 'react-router-dom';

// Represents a recipe generated from Spoonacular api.
function GeneratedRecipe() {
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
			<GeneratedRecipeInfo />
			<NextRecipe />
			<SaveRecipe />
			<button onClick={startOver}>Start Over</button>
		</div>
	);
}

export default GeneratedRecipe;
