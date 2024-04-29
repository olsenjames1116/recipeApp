import { Provider } from 'react-redux';
import GeneratedRecipeContainer from '../GeneratedRecipeContainer';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockGeneratedRecipeContainer = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GeneratedRecipeContainer />
			</BrowserRouter>
		</Provider>
	);
};

describe('GeneratedRecipeContainer', () => {
	it('should render component.', () => {
		render(<MockGeneratedRecipeContainer />);
		const generatedRecipeContainer = screen.getByTestId(
			'generated-recipe-container'
		);

		expect(generatedRecipeContainer).toBeInTheDocument();
	});
});
