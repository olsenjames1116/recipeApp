import { Provider } from 'react-redux';
import GroceriesPage from '../GroceriesPage';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockGroceriesPage = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GroceriesPage />
			</BrowserRouter>
		</Provider>
	);
};

describe('GroceriesPage', () => {
	it('should render component.', () => {
		render(<MockGroceriesPage />);
		const groceriesPage = screen.getByTestId('groceries-page');

		expect(groceriesPage).toBeInTheDocument();
	});
});
