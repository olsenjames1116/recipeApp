import GroceryListItem from '../GroceryListItem';
import { render, screen } from '@testing-library/react';
import { IGrocery } from '../../../types';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

interface GroceryListItemProps {
	grocery: IGrocery;
	index: number;
}

const MockGroceryListItem = ({ grocery, index }: GroceryListItemProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GroceryListItem grocery={grocery} index={index} />
			</BrowserRouter>
		</Provider>
	);
};

describe('GroceryListItem', () => {
	it('should render component.', () => {
		render(
			<MockGroceryListItem
				grocery={{ _id: '1234', name: 'peppers', checked: false }}
				index={0}
			/>
		);
		const groceryListItem = screen.getByTestId('grocery-list-item-0');

		expect(groceryListItem).toBeInTheDocument();
	});

	it('should display grocery name in label.', () => {
		render(
			<MockGroceryListItem
				grocery={{ _id: '1234', name: 'peppers', checked: false }}
				index={0}
			/>
		);
		const groceryListItemLabel = screen.getByTestId(
			'grocery-list-item-label-0'
		);

		expect(groceryListItemLabel).toHaveTextContent(/peppers/i);
	});
});
