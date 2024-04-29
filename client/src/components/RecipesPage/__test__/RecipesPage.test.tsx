import { Provider } from 'react-redux';
import RecipesPage from '../RecipesPage';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockRecipesPage = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RecipesPage />
			</BrowserRouter>
		</Provider>
	);
};

describe('RecipesPage', () => {
	it('should render component.', () => {
		render(<MockRecipesPage />);
		const recipesPage = screen.getByTestId('recipes-page');

		expect(recipesPage).toBeInTheDocument();
	});
});
