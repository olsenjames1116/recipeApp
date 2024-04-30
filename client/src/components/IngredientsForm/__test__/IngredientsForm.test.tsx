import { Provider } from 'react-redux';
import IngredientsForm from '../IngredientsForm';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const MockIngredientsForm = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientsForm />
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientsForm', () => {
	it('should render component.', () => {
		render(<MockIngredientsForm />);
		const ingredientsForm = screen.getByTestId('ingredients-form');

		expect(ingredientsForm).toBeInTheDocument();
	});

	it('should have disabled save button if inputs are not interacted with.', () => {
		render(<MockIngredientsForm />);
		const formSaveButton = screen.getByTestId('ingredients-form-save-button');

		expect(formSaveButton).toBeDisabled();
	});

	it('should enable save button if inputs are interacted with.', async () => {
		render(<MockIngredientsForm />);
		const ingredientInput = await screen.findByTestId('ingredient-input-0');
		const formSaveButton = screen.getByTestId('ingredients-form-save-button');

		await userEvent.click(ingredientInput);

		expect(formSaveButton).toBeEnabled();
	});
});
