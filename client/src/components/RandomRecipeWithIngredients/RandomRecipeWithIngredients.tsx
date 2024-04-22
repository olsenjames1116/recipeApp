import styles from './RandomRecipeWithIngredients.module.scss';

interface RandomRecipeWithIngredientsProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Represents the button to search for a random recipe using the ingredients
the user has on hand. */
function RandomRecipeWithIngredients({
	setDisplayMenu,
}: RandomRecipeWithIngredientsProps) {
	// Display the search menu when the user clicks on the search button.
	const displaySearchMenu = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		setDisplayMenu(true);
	};

	return (
		<button
			onClick={displaySearchMenu}
			className={styles.button}
			data-testid="use-ingredients-button"
		>
			Use My Ingredients
		</button>
	);
}

export default RandomRecipeWithIngredients;
