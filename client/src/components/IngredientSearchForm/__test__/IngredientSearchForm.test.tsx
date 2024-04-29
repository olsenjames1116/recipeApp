import { Provider } from 'react-redux';
import IngredientSearchForm from '../IngredientSearchForm';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

interface IngredientSearchFormProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockIngredientSearchForm = ({
	setDisplayMenu,
}: IngredientSearchFormProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientSearchForm setDisplayMenu={setDisplayMenu} />
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientSearchForm', () => {
	it('should render component.', () => {
		render(<MockIngredientSearchForm setDisplayMenu={vi.fn()} />);
		const ingredientSearchForm = screen.getByTestId('ingredient-search-form');

		expect(ingredientSearchForm).toBeInTheDocument();
	});

	it('should have a disabled submit button with no selected ingredients.', () => {
		render(<MockIngredientSearchForm setDisplayMenu={vi.fn()} />);
		const ingredientSubmitSearchFormButton = screen.getByTestId(
			'submit-ingredient-search-form-button'
		);

		expect(ingredientSubmitSearchFormButton).toBeDisabled();
	});

	it('should have enabled submit button with selected ingredients.', async () => {
		render(<MockIngredientSearchForm setDisplayMenu={vi.fn()} />);
		const ingredientSearchInput = screen.getByTestId(
			'ingredient-search-input-0'
		);

		await userEvent.click(ingredientSearchInput);
		const ingredientSubmitSearchFormButton = screen.getByTestId(
			'submit-ingredient-search-form-button'
		);

		expect(ingredientSubmitSearchFormButton).toBeEnabled();
	});

	it('should display error message if input is checked, then unchecked and user presses submit button.', async () => {
		render(<MockIngredientSearchForm setDisplayMenu={vi.fn()} />);
		const ingredientSearchInput = screen.getByTestId(
			'ingredient-search-input-0'
		);

		await userEvent.click(ingredientSearchInput);
		await userEvent.click(ingredientSearchInput);
		const ingredientSubmitSearchFormButton = screen.getByTestId(
			'submit-ingredient-search-form-button'
		);
		userEvent.click(ingredientSubmitSearchFormButton);
		const inputMessage = await screen.findByTestId('input-message-0');

		expect(inputMessage).toBeInTheDocument();
	});
});
