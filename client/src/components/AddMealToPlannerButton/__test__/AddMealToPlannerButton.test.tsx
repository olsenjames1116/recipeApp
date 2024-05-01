import { Provider } from 'react-redux';
import AddMealToPlannerButton from '../AddMealToPlannerButton';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

interface AddMealToPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockAddMealToPlannerButton = ({
	setDisplayMenu,
}: AddMealToPlannerProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AddMealToPlannerButton setDisplayMenu={setDisplayMenu} />
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerPage', () => {
	it('should render component.', () => {
		render(<MockAddMealToPlannerButton setDisplayMenu={vi.fn()} />);
		const addMealToPlannerButton = screen.getByTestId(
			'add-meal-to-planner-button'
		);

		expect(addMealToPlannerButton).toBeInTheDocument();
	});

	it('should call setDisplayMenu when clicked.', async () => {
		const mockSetDisplayMenu = vi.fn();
		render(<MockAddMealToPlannerButton setDisplayMenu={mockSetDisplayMenu} />);
		const addMealToPlannerButton = screen.getByTestId(
			'add-meal-to-planner-button'
		);

		await userEvent.click(addMealToPlannerButton);

		expect(mockSetDisplayMenu).toHaveBeenCalled();
	});
});
