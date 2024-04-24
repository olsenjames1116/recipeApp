import { BrowserRouter } from 'react-router-dom';
import LogInOptions from '../LogInOptions';
import { render, screen } from '@testing-library/react';

const MockLogInOptions = () => {
	return (
		<BrowserRouter>
			<LogInOptions />
		</BrowserRouter>
	);
};

describe('LogInOptions', () => {
	it('should render component', () => {
		render(<MockLogInOptions />);
		const logInOptions = screen.getByTestId('log-in-options');

		expect(logInOptions).toBeInTheDocument();
	});
});
