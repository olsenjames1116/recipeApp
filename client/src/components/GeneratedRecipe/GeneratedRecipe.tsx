import { useNavigate } from 'react-router-dom';
import styles from './GeneratedRecipe.module.scss';
import GeneratedRecipeContainer from '../GeneratedRecipeContainer/GeneratedRecipeContainer';

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
		<div className={styles.container}>
			<GeneratedRecipeContainer />
			<button
				onClick={startOver}
				className={styles.button}
				data-cy="start-over-button"
			>
				Start Over
			</button>
		</div>
	);
}

export default GeneratedRecipe;
