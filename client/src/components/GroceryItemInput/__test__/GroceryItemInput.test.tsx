import { Provider } from 'react-redux';
import GroceryItemInput from '../GroceryItemInput';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockRef = {
	current: null,
};

interface GroceryItemInputProps {
	inputMenuRef: React.RefObject<HTMLLIElement>;
	displayInput: boolean;
	setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockGroceryItemInput = ({
	inputMenuRef,
	displayInput,
	setDisplayInput,
}: GroceryItemInputProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GroceryItemInput
					inputMenuRef={inputMenuRef}
					displayInput={displayInput}
					setDisplayInput={setDisplayInput}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('GroceryItemInput', () => {
	it('should render component.', () => {
		render(
			<MockGroceryItemInput
				inputMenuRef={mockRef}
				displayInput={true}
				setDisplayInput={() => {}}
			/>
		);
		const groceryItemInput = screen.getByTestId('grocery-item-input');

		expect(groceryItemInput).toBeInTheDocument();
	});

	it('should display error message if input is empty.', async () => {
		render(
			<MockGroceryItemInput
				inputMenuRef={mockRef}
				displayInput={true}
				setDisplayInput={() => {}}
			/>
		);
		const groceryItemInputAddButton = screen.getByTestId(
			'grocery-item-input-add-button'
		);

		userEvent.click(groceryItemInputAddButton);
		const inputMessage = await screen.findByTestId('input-message-0');

		expect(inputMessage).toHaveTextContent(/item input must not be empty./i);
	});
});
