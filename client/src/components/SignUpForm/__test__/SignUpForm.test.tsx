import { BrowserRouter } from 'react-router-dom';
import SignUpForm from '../SignUpForm';
import { render, screen } from '@testing-library/react';

const MockSignUpForm = () => {
	return (
		<BrowserRouter>
			<SignUpForm />
		</BrowserRouter>
	);
};

describe('SignUpForm', () => {
	it('should render component', () => {
		render(<MockSignUpForm />);

		const signUpForm = screen.getByTestId('sign-up-form');

		expect(signUpForm).toBeInTheDocument();
	});
});
