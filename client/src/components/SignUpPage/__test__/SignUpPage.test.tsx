import { BrowserRouter } from 'react-router-dom';
import SignUpPage from '../SignUpPage';
import { render, screen } from '@testing-library/react';

const MockSignUpPage = () => {
	return (
		<BrowserRouter>
			<SignUpPage />
		</BrowserRouter>
	);
};

describe('SignUpPage', () => {
	it('should render component', () => {
		render(<MockSignUpPage />);

		const main = screen.getByTestId('sign-up-page');

		expect(main).toBeInTheDocument();
	});
});
