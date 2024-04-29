import { Provider } from 'react-redux';
import RandomRecipeWithIngredients from '../RandomRecipeWithIngredients';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

interface RandomRecipeWithIngredientsProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockRandomRecipeWithIngredients = ({
	setDisplayMenu,
}: RandomRecipeWithIngredientsProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RandomRecipeWithIngredients setDisplayMenu={setDisplayMenu} />
			</BrowserRouter>
		</Provider>
	);
};

describe('RandomRecipeWithIngredients', () => {
	it('should render component.', () => {
		render(<MockRandomRecipeWithIngredients setDisplayMenu={vi.fn()} />);
		const randomRecipeWithIngredients = screen.getByTestId(
			'random-recipe-with-ingredients-button'
		);

		expect(randomRecipeWithIngredients).toBeInTheDocument();
	});

	it('should call setDisplayMenu when clicked.', async () => {
		const mockSetDisplayMenu = vi.fn();
		render(
			<MockRandomRecipeWithIngredients setDisplayMenu={mockSetDisplayMenu} />
		);
		const randomRecipeButton = screen.getByTestId(
			'random-recipe-with-ingredients-button'
		);

		await userEvent.click(randomRecipeButton);

		expect(mockSetDisplayMenu).toHaveBeenCalled();
	});
});
