import { BrowserRouter } from 'react-router-dom';
import SignUpOptions from '../SignUpOptions';
import { render, screen } from '@testing-library/react';

const MockSignUpOptions = () => {
	return (
		<BrowserRouter>
			<SignUpOptions />
		</BrowserRouter>
	);
};

describe('SignUpOptions', () => {
	it('should render component.', () => {
		render(<MockSignUpOptions />);
		const signUpOptions = screen.getByTestId('sign-up-options');

		expect(signUpOptions).toBeInTheDocument();
	});
});
