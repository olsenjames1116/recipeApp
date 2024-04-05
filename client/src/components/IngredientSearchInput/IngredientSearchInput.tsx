import { IIngredientWithId } from '../../types';
import styles from './IngredientSearchInput.module.scss';

interface IngredientSearchInputProps {
	ingredient: IIngredientWithId;
	userHasIngredient: boolean;
	submitButtonRef: React.RefObject<HTMLButtonElement>;
}

// Represents a single ingredient to search for a random recipe with.
function IngredientSearchInput({
	ingredient,
	userHasIngredient,
	submitButtonRef,
}: IngredientSearchInputProps) {
	// Enables the submit button to be pressed after a change has been made to the form.
	const enableSubmit = () => {
		if (submitButtonRef.current) submitButtonRef.current.disabled = false;
	};

	return (
		<li className={styles.listItem}>
			<input
				type="checkbox"
				id={ingredient._id}
				value={ingredient.name}
				onChange={enableSubmit}
			/>
			<label
				htmlFor={ingredient._id}
				className={`${styles.label} ${
					userHasIngredient ? styles.inPantry : ''
				}`}
			>
				{ingredient.name}
			</label>
		</li>
	);
}

export default IngredientSearchInput;
