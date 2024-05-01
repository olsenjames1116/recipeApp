import { Provider } from 'react-redux';
import MealPlannerForm from '../MealPlannerForm';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockMealPlannerForm = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<MealPlannerForm />
			</BrowserRouter>
		</Provider>
	);
};

describe('MealPlannerForm', () => {
	it('should render component.', () => {
		render(<MockMealPlannerForm />);
		const mealPlannerForm = screen.getByTestId('meal-planner-form');

		expect(mealPlannerForm).toBeInTheDocument();
	});
});
