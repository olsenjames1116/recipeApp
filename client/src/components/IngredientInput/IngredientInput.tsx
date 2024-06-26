import { IIngredientWithId } from '../../types';
import styles from './IngredientInput.module.scss';

interface IngredientInputProps {
	ingredient: IIngredientWithId;
	checked: boolean;
	saveButtonRef: React.RefObject<HTMLButtonElement>;
	index: number;
}

// Represents a single ingredient input to save ingredients for a user.
function IngredientInput({
	ingredient,
	checked,
	saveButtonRef,
	index,
}: IngredientInputProps) {
	// Enables the save button to be pressed after a change has been made to the form.
	const enableSave = () => {
		if (saveButtonRef.current) saveButtonRef.current.disabled = false;
	};

	return (
		<li key={ingredient._id} className={styles.listItem}>
			<input
				type="checkbox"
				id={ingredient._id}
				value={ingredient.name}
				onChange={enableSave}
				defaultChecked={checked}
				className={styles.input}
				data-testid={`ingredient-input-${index}`}
			/>
			<label
				htmlFor={ingredient._id}
				className={styles.label}
				data-testid={`ingredient-input-label-${index}`}
			>
				{ingredient.name}
			</label>
		</li>
	);
}

export default IngredientInput;
