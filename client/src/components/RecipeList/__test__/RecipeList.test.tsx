import { Provider } from 'react-redux';
import RecipeList from '../RecipeList';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockRecipeList = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RecipeList />
			</BrowserRouter>
		</Provider>
	);
};

describe('RecipeList', () => {
	it('should render component.', () => {
		render(<MockRecipeList />);
		const recipeList = screen.getByTestId('recipe-list');

		expect(recipeList).toBeInTheDocument();
	});

	it('should display a message to user if recipe list is empty.', async () => {
		render(<MockRecipeList />);
		const recipeList = screen.getByTestId('recipe-list');

		expect(recipeList).toHaveTextContent(/you do not have saved recipes/i);
	});

	it('should display recipes if the user has stored recipes.', async () => {
		render(<MockRecipeList />);
		const recipeListItem = await screen.findByTestId('recipe-list-item-0');

		expect(recipeListItem).toBeInTheDocument();
	});
});
