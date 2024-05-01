import { Provider } from 'react-redux';
import ClearPlannerButton from '../ClearPlannerButton';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

const MockClearPlannerButton = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<ClearPlannerButton />
			</BrowserRouter>
		</Provider>
	);
};

describe('ClearPlannerButton', () => {
	it('should render component.', () => {
		render(<MockClearPlannerButton />);
		const clearPlannerButton = screen.getByTestId('clear-planner-button');

		expect(clearPlannerButton).toBeInTheDocument();
	});
});
