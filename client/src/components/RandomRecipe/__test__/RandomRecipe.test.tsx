import { Provider } from 'react-redux';
import RandomRecipe from '../RandomRecipe';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockRandomRecipe = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RandomRecipe />
			</BrowserRouter>
		</Provider>
	);
};

describe('RandomRecipe', () => {
	it('should render component.', () => {
		render(<MockRandomRecipe />);
		const randomRecipe = screen.getByTestId('random-recipe-button');

		expect(randomRecipe).toBeInTheDocument();
	});
});
