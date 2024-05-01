import { Provider } from 'react-redux';
import MealPlannerMenu from '../MealPlannerMenu';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockRef = {
	current: null,
};

interface MealPlannerMenuProps {
	menuRef: React.RefObject<HTMLDivElement>;
	displayMenu: boolean;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockMealPlannerMenu = ({
	menuRef,
	displayMenu,
	setDisplayMenu,
}: MealPlannerMenuProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerMenu
					menuRef={menuRef}
					displayMenu={displayMenu}
					setDisplayMenu={setDisplayMenu}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerMenu', () => {
	it('should render component.', () => {
		render(
			<MockMealPlannerMenu
				menuRef={mockRef}
				displayMenu={true}
				setDisplayMenu={vi.fn()}
			/>
		);
		const mealPlannerMenu = screen.getByTestId('meal-planner-menu');

		expect(mealPlannerMenu).toBeInTheDocument();
	});

	it('should display search results when user types into search bar.', async () => {
		render(
			<MockMealPlannerMenu
				menuRef={mockRef}
				displayMenu={true}
				setDisplayMenu={vi.fn()}
			/>
		);
		const mealPlannerFormInput = screen.getByTestId('meal-planner-form-input');

		await userEvent.type(mealPlannerFormInput, 'Chicken Parm');
		const mealPlannerSearchResults = screen.getByTestId(
			'meal-planner-search-results'
		);

		expect(mealPlannerSearchResults).toBeInTheDocument();
	});

	it('should display message if no results are found from search.', async () => {
		render(
			<MockMealPlannerMenu
				menuRef={mockRef}
				displayMenu={true}
				setDisplayMenu={vi.fn()}
			/>
		);
		const mealPlannerFormInput = screen.getByTestId('meal-planner-form-input');

		await userEvent.type(mealPlannerFormInput, 'Spaghetti');
		const mealPlannerSearchResults = screen.getByTestId(
			'meal-planner-search-results'
		);

		expect(mealPlannerSearchResults).toHaveTextContent(/no results for/i);
	});

	it('should display a recipe if the search produces a result.', async () => {
		render(
			<MockMealPlannerMenu
				menuRef={mockRef}
				displayMenu={true}
				setDisplayMenu={vi.fn()}
			/>
		);
		const mealPlannerFormInput = screen.getByTestId('meal-planner-form-input');

		await userEvent.type(mealPlannerFormInput, 'Chicken Parm');
		const mealPlannerRecipe = screen.getByTestId('meal-planner-recipe-0');

		expect(mealPlannerRecipe).toBeInTheDocument();
	});
});
