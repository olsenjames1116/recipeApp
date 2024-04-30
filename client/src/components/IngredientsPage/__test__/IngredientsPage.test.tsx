import { Provider } from 'react-redux';
import IngredientsPage from '../IngredientsPage';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockIngredientsPage = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientsPage />
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientsPage', () => {
	it('should render component.', () => {
		render(<MockIngredientsPage />);
		const ingredientsPage = screen.getByTestId('ingredients-page');

		expect(ingredientsPage).toBeInTheDocument();
	});
});
