import { Provider } from 'react-redux';
import RecipesContent from '../RecipesContent';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockRecipesContent = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RecipesContent />
			</BrowserRouter>
		</Provider>
	);
};

describe('RecipesContent', () => {
	it('should render component.', () => {
		render(<MockRecipesContent />);
		const recipesContent = screen.getByTestId('recipes-content');

		expect(recipesContent).toBeInTheDocument();
	});
});
