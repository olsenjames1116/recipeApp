import HomeContent from '../HomeContent';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../redux/store';
import userEvent from '@testing-library/user-event';

interface HomeContentProps {
	menuRef: React.RefObject<HTMLDivElement>;
}

const mockRef = {
	current: null,
};

const MockHomeContent = ({ menuRef }: HomeContentProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<HomeContent menuRef={menuRef} />
			</BrowserRouter>
		</Provider>
	);
};

describe('HomeContent', () => {
	it('should render component.', () => {
		render(<MockHomeContent menuRef={mockRef} />);
		const homeContent = screen.getByTestId('home-content');

		expect(homeContent).toBeInTheDocument();
	});

	it('should display ingredient search menu when random recipe with ingredients button is clicked.', async () => {
		render(<MockHomeContent menuRef={mockRef} />);
		const randomRecipeWithIngredientsButton = screen.getByTestId(
			'random-recipe-with-ingredients-button'
		);

		userEvent.click(randomRecipeWithIngredientsButton);
		const ingredientSearchMenu = await screen.findByTestId(
			'ingredient-search-menu'
		);

		expect(ingredientSearchMenu).toBeInTheDocument();
	});

	it('should hide menu when ingredient search menu is clicked out of.', async () => {
		render(<MockHomeContent menuRef={mockRef} />);
		const randomRecipeWithIngredientsButton = screen.getByTestId(
			'random-recipe-with-ingredients-button'
		);
		const homeContent = screen.getByTestId('home-content');

		userEvent.click(randomRecipeWithIngredientsButton);
		userEvent.click(homeContent);
		const ingredientSearchMenu = screen.queryByTestId('ingredient-search-menu');

		expect(ingredientSearchMenu).not.toBeInTheDocument();
	});

	it('should hide menu when close icon is clicked on ingredient search menu.', async () => {
		render(<MockHomeContent menuRef={mockRef} />);
		const randomRecipeWithIngredientsButton = screen.getByTestId(
			'random-recipe-with-ingredients-button'
		);

		userEvent.click(randomRecipeWithIngredientsButton);
		const closeIcon = await screen.findByTestId('close-icon');
		await userEvent.click(closeIcon);
		const ingredientSearchMenu = screen.queryByTestId('ingredient-search-menu');
		expect(ingredientSearchMenu).not.toBeInTheDocument();
	});

	it('should generate recipe when button is clicked.', async () => {
		render(<MockHomeContent menuRef={mockRef} />);
		const randomRecipeButton = screen.getByTestId('random-recipe-button');

		userEvent.click(randomRecipeButton);
		const generatedRecipe = await screen.findByTestId('generated-recipe');

		expect(generatedRecipe).toBeInTheDocument();
	});
});
