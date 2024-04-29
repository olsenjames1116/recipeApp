import { Provider } from 'react-redux';
import GeneratedRecipeInfo from '../GeneratedRecipeInfo';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockGeneratedRecipeInfo = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GeneratedRecipeInfo />
			</BrowserRouter>
		</Provider>
	);
};

describe('GeneratedRecipeInfo', () => {
	it('should render component.', () => {
		render(<MockGeneratedRecipeInfo />);
		const generatedRecipeInfo = screen.getByTestId('generated-recipe-info');

		expect(generatedRecipeInfo).toBeInTheDocument();
	});
});
