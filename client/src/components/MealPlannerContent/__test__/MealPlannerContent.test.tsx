import { Provider } from 'react-redux';
import MealPlannerContent from '../MealPlannerContent';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockRef = {
	current: null,
};

interface MealPlannerContentProps {
	menuRef: React.RefObject<HTMLDivElement>;
}

const MockMealPlannerContent = ({ menuRef }: MealPlannerContentProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerContent menuRef={menuRef} />
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerContent', () => {
	it('should render component.', () => {
		render(<MockMealPlannerContent menuRef={mockRef} />);
		const mealPlannerContent = screen.getByTestId('meal-planner-content');

		expect(mealPlannerContent).toBeInTheDocument();
	});

	it('should display meal planner menu when meal planner is clicked.', async () => {
		render(<MockMealPlannerContent menuRef={mockRef} />);
		const mealPlannerDay = screen.getByTestId('meal-planner-monday');

		userEvent.click(mealPlannerDay);
		const mealPlannerMenu = await screen.findByTestId('meal-planner-menu');

		expect(mealPlannerMenu).toBeInTheDocument();
	});

	it('should not display meal planner menu when meal already exists for a day in the planner.', async () => {
		render(<MockMealPlannerContent menuRef={mockRef} />);
		const mealPlannerDay = screen.getByTestId('meal-planner-sunday');

		userEvent.click(mealPlannerDay);
		const mealPlannerMenu = screen.queryByTestId('meal-planner-menu');

		expect(mealPlannerMenu).not.toBeInTheDocument();
	});

	it('should close the menu when the close icon is clicked.', async () => {
		render(<MockMealPlannerContent menuRef={mockRef} />);
		const mealPlannerDay = screen.getByTestId('meal-planner-monday');

		await userEvent.click(mealPlannerDay);
		const closeIcon = screen.getByTestId('close-icon');
		await userEvent.click(closeIcon);
		const mealPlannerMenu = screen.queryByTestId('meal-planner-menu');

		expect(mealPlannerMenu).not.toBeInTheDocument();
	});

	it('should close the menu when it is clicked out of.', async () => {
		render(<MockMealPlannerContent menuRef={mockRef} />);
		const mealPlannerDay = screen.getByTestId('meal-planner-monday');
		const mealPlannerContent = screen.getByTestId('meal-planner-content');

		await userEvent.click(mealPlannerDay);
		const mealPlannerMenu = screen.queryByTestId('meal-planner-menu');
		await userEvent.click(mealPlannerContent);

		expect(mealPlannerMenu).not.toBeInTheDocument();
	});
});
