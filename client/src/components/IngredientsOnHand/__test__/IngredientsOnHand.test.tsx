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
});
