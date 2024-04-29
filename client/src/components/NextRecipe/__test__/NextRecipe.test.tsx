import { Provider } from 'react-redux';
import NextRecipe from '../NextRecipe';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockNextRecipe = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NextRecipe />
			</BrowserRouter>
		</Provider>
	);
};

describe('NextRecipe', () => {
	it('should render component.', () => {
		render(<MockNextRecipe />);
		const nextRecipe = screen.getByTestId('next-recipe');

		expect(nextRecipe).toBeInTheDocument();
	});
});
