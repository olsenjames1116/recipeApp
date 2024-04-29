import { Provider } from 'react-redux';
import SaveRecipe from '../SaveRecipe';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockSaveRecipe = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<SaveRecipe />
			</BrowserRouter>
		</Provider>
	);
};

describe('SaveRecipe', () => {
	it('should render component.', () => {
		render(<MockSaveRecipe />);
		const saveRecipe = screen.getByTestId('save-recipe');

		expect(saveRecipe).toBeInTheDocument();
	});
});
