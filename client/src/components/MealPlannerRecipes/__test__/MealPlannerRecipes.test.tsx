import { Provider } from 'react-redux';
import MealPlannerRecipes from '../MealPlannerRecipes';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

interface MealPlannerRecipesProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockMealPlannerRecipes = ({
	setDisplayMenu,
}: MealPlannerRecipesProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerRecipes setDisplayMenu={setDisplayMenu} />
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerRecipes', () => {
	it('should render component.', () => {
		render(<MockMealPlannerRecipes setDisplayMenu={vi.fn()} />);
		const mealPlannerRecipes = screen.getByTestId('meal-planner-recipes');

		expect(mealPlannerRecipes).toBeInTheDocument();
	});
});
