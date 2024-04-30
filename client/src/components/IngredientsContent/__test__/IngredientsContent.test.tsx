import { Provider } from 'react-redux';
import IngredientsContent from '../IngredientsContent';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockIngredientsContent = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientsContent />
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientsContent', () => {
	it('should render component.', () => {
		render(<MockIngredientsContent />);
		const ingredientsContent = screen.getByTestId('ingredients-content');

		expect(ingredientsContent).toBeInTheDocument();
	});
});
