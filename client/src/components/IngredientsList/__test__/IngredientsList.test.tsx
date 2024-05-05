import { Provider } from 'react-redux';
import IngredientsList from '../IngredientsList';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockIngredientsList = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientsList />
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientsList', () => {
	it('should render component.', () => {
		render(<MockIngredientsList />);
		const ingredientsList = screen.getByTestId('ingredients-list');

		expect(ingredientsList).toBeInTheDocument();
	});
});
