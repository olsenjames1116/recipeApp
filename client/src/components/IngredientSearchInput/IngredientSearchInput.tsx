import { IIngredientWithId } from '../../types';

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
		<li>
			<input
				type="checkbox"
				id={ingredient._id}
				value={ingredient.name}
				onChange={enableSubmit}
			/>
			<label
				htmlFor={ingredient._id}
				style={userHasIngredient ? { color: 'green' } : { color: 'black' }}
			>
				{ingredient.name}
			</label>
		</li>
	);
}

export default IngredientSearchInput;
