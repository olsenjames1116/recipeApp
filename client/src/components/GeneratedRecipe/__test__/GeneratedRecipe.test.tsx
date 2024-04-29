import { Provider } from 'react-redux';
import GeneratedRecipe from '../GeneratedRecipe';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockGeneratedRecipe = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GeneratedRecipe />
			</BrowserRouter>
		</Provider>
	);
};

describe('GeneratedRecipe', () => {
	it('should render component.', () => {
		render(<MockGeneratedRecipe />);
		const generatedRecipe = screen.getByTestId('generated-recipe');

		expect(generatedRecipe).toBeInTheDocument();
	});
});
