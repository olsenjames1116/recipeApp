import { Provider } from 'react-redux';
import GroceriesContent from '../GroceriesContent';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const mockRef = {
	current: null,
};

interface GroceriesContentProps {
	inputMenuRef: React.RefObject<HTMLLIElement>;
}

const MockGroceriesContent = ({ inputMenuRef }: GroceriesContentProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GroceriesContent inputMenuRef={inputMenuRef} />
			</BrowserRouter>
		</Provider>
	);
};

describe('GroceriesContent', () => {
	it('should render component.', () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesContent = screen.getByTestId('groceries-content');

		expect(groceriesContent).toBeInTheDocument();
	});
});
