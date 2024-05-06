import { Provider } from 'react-redux';
import GroceriesContent from '../GroceriesContent';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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

	it('should display input when add button is clicked.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesFormAddButton = screen.getByTestId(
			'groceries-form-add-button'
		);

		userEvent.click(groceriesFormAddButton);
		const groceryItemInput = await screen.findByTestId('grocery-item-input');

		expect(groceryItemInput).toBeInTheDocument();
	});

	it('should hide the add button when the input is displayed.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesFormAddButton = screen.getByTestId(
			'groceries-form-add-button'
		);

		await userEvent.click(groceriesFormAddButton);

		expect(groceriesFormAddButton).not.toBeInTheDocument();
	});

	it('should the input when the cancel button is clicked.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesFormAddButton = screen.getByTestId(
			'groceries-form-add-button'
		);

		userEvent.click(groceriesFormAddButton);
		const groceriesFormCancelButton = await screen.findByTestId(
			'grocery-item-input-cancel-button'
		);
		await userEvent.click(groceriesFormCancelButton);
		const groceryItemInput = screen.queryByTestId('grocery-item-input');

		expect(groceryItemInput).not.toBeInTheDocument();
	});

	it('should display the grocery item after is has been added from input.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesFormAddButton = screen.getByTestId(
			'groceries-form-add-button'
		);

		userEvent.click(groceriesFormAddButton);
		const groceryItemInput = await screen.findByTestId('grocery-item-input');
		await userEvent.type(groceryItemInput, 'beef');
		const groceryItemInputAddButton = screen.getByTestId(
			'grocery-item-input-add-button'
		);
		userEvent.click(groceryItemInputAddButton);
		const groceryListItemLabel = await screen.findByTestId(
			'grocery-list-item-label-1'
		);

		expect(groceryListItemLabel).toHaveTextContent(/beef/i);
	});

	it('should remove a grocery item when the delete button is clicked.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesFormAddButton = screen.getByTestId(
			'groceries-form-add-button'
		);

		userEvent.click(groceriesFormAddButton);
		const groceryItemInput = await screen.findByTestId('grocery-item-input');
		await userEvent.type(groceryItemInput, 'beef');
		const groceryItemInputAddButton = screen.getByTestId(
			'grocery-item-input-add-button'
		);
		userEvent.click(groceryItemInputAddButton);
		const groceryListItemRemoveButton = await screen.findByTestId(
			'grocery-list-item-remove-button-1'
		);
		await userEvent.click(groceryListItemRemoveButton);
		const groceryListItem = screen.queryByTestId('grocery-list-item-1');

		expect(groceryListItem).not.toBeInTheDocument();
	});

	it('should remove all grocery items when the clear all button is clicked.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceriesFormClearButton = screen.getByTestId(
			'groceries-form-clear-button'
		);

		await userEvent.click(groceriesFormClearButton);
		const groceryListItem = screen.queryByTestId('grocery-list-item-0');

		expect(groceryListItem).not.toBeInTheDocument();
	});

	it('should add a strikethrough if checkbox is clicked on grocery item.', async () => {
		render(<MockGroceriesContent inputMenuRef={mockRef} />);
		const groceryListItemInput = await screen.findByTestId(
			'grocery-list-item-input-0'
		);

		await userEvent.click(groceryListItemInput);
		const groceryListItemLabel = await screen.findByTestId(
			'grocery-list-item-label-0'
		);

		expect(groceryListItemLabel).toHaveClass(/strike/i);
	});
});
