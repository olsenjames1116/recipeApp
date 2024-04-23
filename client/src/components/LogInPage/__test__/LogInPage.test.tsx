import { BrowserRouter } from 'react-router-dom';
import LogInPage from '../LogInPage';
import { render, screen } from '@testing-library/react';

const MockLogInPage = () => {
	return (
		<BrowserRouter>
			<LogInPage />
		</BrowserRouter>
	);
};

describe('LogInPage', () => {
	it('should render component', () => {
		render(<MockLogInPage />);
		const logInPage = screen.getByTestId('login-page');

		expect(logInPage).toBeInTheDocument();
	});
});
