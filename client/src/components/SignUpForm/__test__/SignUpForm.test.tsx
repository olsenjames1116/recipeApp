import SignUpForm from '../SignUpForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const MockSignUpForm = () => {
	return (
		<BrowserRouter>
			<SignUpForm />
		</BrowserRouter>
	);
};

describe('SignUpForm', () => {
	function setup(component: JSX.Element) {
		return {
			user: userEvent.setup(),
			...render(component),
		};
	}

	it('should display success message if all input is correct', async () => {
		const { user } = setup(<MockSignUpForm />);

		const usernameInput = screen.getByPlaceholderText(/username/i);
		const passwordInput = screen.getByPlaceholderText(/^password/i);
		const confirmPasswordInput =
			screen.getByPlaceholderText(/confirm password$/i);
		const submitButton = screen.getByText(/sign up/i);

		await user.type(usernameInput, 'username123');
		await user.type(passwordInput, 'password123');
		await user.type(confirmPasswordInput, 'password123');

		user.click(submitButton);

		const inputMessage = await screen.findByTestId('input-message-0');

		screen.debug();

		expect(inputMessage).toHaveTextContent(
			'Your account has been created. You will be redirected to log in.'
		);
	});

	// should display an error message if username is empty
	// should display an error message if password is empty
	// should display an error message if passwords do not match
});
