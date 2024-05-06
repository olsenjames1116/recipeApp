import { Provider } from 'react-redux';
import IngredientsOnHand from '../IngredientsOnHand';
import { screen, render } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockIngredientsOnHand = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientsOnHand />
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientsOnHand', () => {
	it('should render component.', () => {
		render(<MockIngredientsOnHand />);
		const ingredientsOnHand = screen.getByTestId('ingredients-on-hand');

		expect(ingredientsOnHand).toBeInTheDocument();
	});

	it('should not display any ingredients if the user does not have one stored.', () => {
		render(<MockIngredientsOnHand />);
		const noUserIngredients = screen.getByTestId('no-user-ingredients');

		expect(noUserIngredients).toHaveTextContent(
			/you do not have any ingredients in your pantry./i
		);
	});

	it('should display an ingredient if the user has one stored.', async () => {
		render(<MockIngredientsOnHand />);
		const userIngredient = await screen.findByTestId('user-ingredient-0');

		expect(userIngredient).toHaveTextContent(/garlic powder/i);
	});
});
