import { Provider } from 'react-redux';
import GroceriesForm from '../GroceriesForm';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockRef = {
	current: null,
};

interface GroceriesFormProps {
	inputMenuRef: React.RefObject<HTMLLIElement>;
	displayInput: boolean;
	setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockGroceriesForm = ({
	inputMenuRef,
	displayInput,
	setDisplayInput,
}: GroceriesFormProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GroceriesForm
					inputMenuRef={inputMenuRef}
					displayInput={displayInput}
					setDisplayInput={setDisplayInput}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('GroceriesForm', () => {
	it('should render component.', () => {
		render(
			<MockGroceriesForm
				inputMenuRef={mockRef}
				displayInput={false}
				setDisplayInput={() => {}}
			/>
		);
		const groceriesForm = screen.getByTestId('groceries-form');

		expect(groceriesForm).toBeInTheDocument();
	});

	it('should call setDisplayInput when add button is clicked.', async () => {
		const mockSetDisplayInput = vi.fn();
		render(
			<MockGroceriesForm
				inputMenuRef={mockRef}
				displayInput={false}
				setDisplayInput={mockSetDisplayInput}
			/>
		);
		const groceriesFormAddButton = screen.getByTestId(
			'groceries-form-add-button'
		);

		await userEvent.click(groceriesFormAddButton);

		expect(mockSetDisplayInput).toHaveBeenCalled();
	});
});
