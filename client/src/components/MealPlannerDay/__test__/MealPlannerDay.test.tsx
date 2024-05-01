import { Provider } from 'react-redux';
import MealPlannerDay from '../MealPlannerDay';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

interface MealPlannerDayProps {
	dayOfTheWeek: string;
	index: number;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockMealPlannerDay = ({
	dayOfTheWeek,
	index,
	setDisplayMenu,
}: MealPlannerDayProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerDay
					dayOfTheWeek={dayOfTheWeek}
					index={index}
					setDisplayMenu={setDisplayMenu}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerDay', () => {
	it('should render component.', () => {
		render(
			<MockMealPlannerDay
				dayOfTheWeek="sunday"
				index={0}
				setDisplayMenu={vi.fn()}
			/>
		);
		const mealPlannerDay = screen.getByTestId('meal-planner-sunday');

		expect(mealPlannerDay).toBeInTheDocument();
	});

	it('should call setDisplayMenu when clicked.', async () => {
		const mockSetDisplayMenu = vi.fn();
		render(
			<MockMealPlannerDay
				dayOfTheWeek="sunday"
				index={0}
				setDisplayMenu={mockSetDisplayMenu}
			/>
		);
		const mealPlannerDay = screen.getByTestId('meal-planner-sunday');

		await userEvent.click(mealPlannerDay);

		expect(mockSetDisplayMenu).toHaveBeenCalled();
	});

	it('should display the day of the week text content with an uppercase first letter.', () => {
		render(
			<MockMealPlannerDay
				dayOfTheWeek="sunday"
				index={0}
				setDisplayMenu={vi.fn()}
			/>
		);
		const mealPlannerDay = screen.getByTestId('meal-planner-span-sunday');

		expect(mealPlannerDay).toHaveTextContent(/Sunday/);
	});
});
