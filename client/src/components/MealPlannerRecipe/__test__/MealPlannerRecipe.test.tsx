import { Provider } from 'react-redux';
import MealPlannerRecipe from '../MealPlannerRecipe';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { IRecipeWithId } from '../../../types';
import { vi } from 'vitest';

interface MealPlannerRecipeProps {
	recipe: IRecipeWithId;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
	index: number;
}

const MockMealPlannerRecipe = ({
	recipe,
	setDisplayMenu,
	index,
}: MealPlannerRecipeProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerRecipe
					recipe={recipe}
					setDisplayMenu={setDisplayMenu}
					index={index}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerRecipe', () => {
	it('should render component.', () => {
		render(
			<MockMealPlannerRecipe
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				setDisplayMenu={vi.fn()}
				index={0}
			/>
		);
		const mealPlannerRecipe = screen.getByTestId('meal-planner-recipe-0');

		expect(mealPlannerRecipe).toBeInTheDocument();
	});

	it('should have an id equal to _id.', () => {
		render(
			<MockMealPlannerRecipe
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				setDisplayMenu={vi.fn()}
				index={0}
			/>
		);
		const mealPlannerRecipe = screen.getByTestId('meal-planner-recipe-0');

		expect(mealPlannerRecipe).toHaveAttribute('id', '1234');
	});

	it('should have a title with text content of recipe title.', () => {
		render(
			<MockMealPlannerRecipe
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				setDisplayMenu={vi.fn()}
				index={0}
			/>
		);
		const mealPlannerRecipe = screen.getByTestId('meal-planner-recipe-span-0');

		expect(mealPlannerRecipe).toHaveTextContent(/chicken parm/i);
	});
});
