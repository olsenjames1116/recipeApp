import { IIngredientWithId } from '../../types';

interface IngredientInputProps {
	ingredient: IIngredientWithId;
	checked: boolean;
	saveButtonRef: React.RefObject<HTMLButtonElement>;
}

// Represents a single ingredient input to save ingredients for a user.
function IngredientInput({
	ingredient,
	checked,
	saveButtonRef,
}: IngredientInputProps) {
	// Enables the save button to be pressed after a change has been made to the form.
	const enableSave = () => {
		if (saveButtonRef.current) saveButtonRef.current.disabled = false;
	};

	return (
		<li key={ingredient._id}>
			<input
				type="checkbox"
				id={ingredient._id}
				value={ingredient.name}
				onChange={enableSave}
				defaultChecked={checked}
			/>
			<label htmlFor={ingredient._id}>{ingredient.name}</label>
		</li>
	);
}

export default IngredientInput;
