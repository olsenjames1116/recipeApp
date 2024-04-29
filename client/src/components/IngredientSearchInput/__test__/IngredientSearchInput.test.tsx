import IngredientSearchInput from '../IngredientSearchInput';
import { render, screen } from '@testing-library/react';

const mockRef = {
	current: null,
};

describe('IngredientSearchInput', () => {
	it('should render component.', () => {
		render(
			<IngredientSearchInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				userHasIngredient={false}
				submitButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientSearchInput = screen.getByTestId(
			'ingredient-search-input-container-0'
		);

		expect(ingredientSearchInput).toBeInTheDocument();
	});

	it('should have inPantry class if user has ingredient.', async () => {
		render(
			<IngredientSearchInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				userHasIngredient={true}
				submitButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientSearchLabel = screen.getByTestId(
			'ingredient-search-label-0'
		);

		expect(ingredientSearchLabel).toHaveClass(/inpantry/i);
	});

	it('should have a * symbol if the user has the ingredient.', () => {
		render(
			<IngredientSearchInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				userHasIngredient={true}
				submitButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientSearchLabel = screen.getByTestId(
			'ingredient-search-label-0'
		);

		expect(ingredientSearchLabel).toHaveTextContent(/\*/i);
	});

	it('should have the name of the ingredient in the label.', () => {
		render(
			<IngredientSearchInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				userHasIngredient={true}
				submitButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientSearchLabel = screen.getByTestId(
			'ingredient-search-label-0'
		);

		expect(ingredientSearchLabel).toHaveTextContent(/bacon/i);
	});
});
