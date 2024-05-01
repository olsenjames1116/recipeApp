import { Provider } from 'react-redux';
import MealPlanner from '../MealPlanner';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

interface MealPlannerProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockMealPlanner = ({ setDisplayMenu }: MealPlannerProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlanner setDisplayMenu={setDisplayMenu} />
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlanner', () => {
	it('should render component.', () => {
		render(<MockMealPlanner setDisplayMenu={vi.fn()} />);
		const mealPlanner = screen.getByTestId('meal-planner');

		expect(mealPlanner).toBeInTheDocument();
	});

	it('should not render a meal component when a meal is not returned from api.', async () => {
		render(<MockMealPlanner setDisplayMenu={vi.fn()} />);
		const meal = screen.queryByTestId('meal-sunday');

		expect(meal).not.toBeInTheDocument();
	});

	it('should render a meal component when a meal is returned from api.', async () => {
		render(<MockMealPlanner setDisplayMenu={vi.fn()} />);
		const meal = await screen.findByTestId('meal-sunday');

		expect(meal).toBeInTheDocument();
	});

	it('should render a meal component with href attribute equal to value from api.', async () => {
		render(<MockMealPlanner setDisplayMenu={vi.fn()} />);
		const mealLink = await screen.findByTestId('meal-link-sunday');

		expect(mealLink).toHaveAttribute('href', 'http://fakepage.com');
	});

	it('should render a meal component with src attribute equal to value from api.', async () => {
		render(<MockMealPlanner setDisplayMenu={vi.fn()} />);
		const mealImage = await screen.findByTestId('meal-image-sunday');

		expect(mealImage).toHaveAttribute('src', 'chickenparm.png');
	});

	it('should render a meal component with title in text content equal to value from api.', async () => {
		render(<MockMealPlanner setDisplayMenu={vi.fn()} />);
		const mealSpan = await screen.findByTestId('meal-span-sunday');

		expect(mealSpan).toHaveTextContent(/chicken parm/i);
	});
});
