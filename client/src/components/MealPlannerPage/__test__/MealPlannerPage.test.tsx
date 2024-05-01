import { Provider } from 'react-redux';
import MealPlannerPage from '../MealPlannerPage';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockMealPlannerPage = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerPage />
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerPage', () => {
	it('should render component.', () => {
		render(<MockMealPlannerPage />);
		const mealPlannerPage = screen.getByTestId('meal-planner-page');

		expect(mealPlannerPage).toBeInTheDocument();
	});
});
