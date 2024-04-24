import { BrowserRouter } from 'react-router-dom';
import LogInForm from '../LogInForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const MockLogInForm = () => {
	return (
		<BrowserRouter>
			<LogInForm />
		</BrowserRouter>
	);
};

describe('LogInForm', () => {
	it('should render component.', () => {
		render(<MockLogInForm />);
		const logInForm = screen.getByTestId('login-form');

		expect(logInForm).toBeInTheDocument();
	});

	describe('Error Path', () => {
		it('should display an error if username is empty.', async () => {
			render(<MockLogInForm />);
			const passwordInput = screen.getByTestId('password-input');
			const logInSubmitButton = screen.getByTestId('log-in-submit');

			await userEvent.type(passwordInput, 'password');
			userEvent.click(logInSubmitButton);

			const inputMessage = await screen.findByText(
				/username must not be empty./i
			);
			expect(inputMessage).toBeInTheDocument();
		});

		it('should display an error if password is empty.', async () => {
			render(<MockLogInForm />);
			const usernameInput = screen.getByTestId('username-input');
			const logInSubmitButton = screen.getByTestId('log-in-submit');

			await userEvent.type(usernameInput, 'username');
			userEvent.click(logInSubmitButton);

			const inputMessage = await screen.findByText(
				/password must not be empty./i
			);
			expect(inputMessage).toBeInTheDocument();
		});

		it('should display an error if username does not match any stored usernames.', async () => {
			render(<MockLogInForm />);
			const usernameInput = screen.getByTestId('username-input');
			const passwordInput = screen.getByTestId('password-input');
			const logInSubmitButton = screen.getByTestId('log-in-submit');

			const username = 'demo';
			await userEvent.type(usernameInput, username);
			await userEvent.type(passwordInput, 'password');
			userEvent.click(logInSubmitButton);

			const inputMessage = await screen.findByText(
				`Username "${username}" does not exist.`
			);
			expect(inputMessage).toBeInTheDocument();
		});

		it('should display an error if password does not match any stored passwords.', async () => {
			render(<MockLogInForm />);
			const usernameInput = screen.getByTestId('username-input');
			const passwordInput = screen.getByTestId('password-input');
			const logInSubmitButton = screen.getByTestId('log-in-submit');

			await userEvent.type(usernameInput, 'username');
			await userEvent.type(passwordInput, 'passw0rd');
			userEvent.click(logInSubmitButton);

			const inputMessage = await screen.findByText(/invalid password./i);
			expect(inputMessage).toBeInTheDocument();
		});
	});

	describe('Happy Path', () => {
		it('should not display an error message if a user logs in successfully.', async () => {
			render(<MockLogInForm />);
			const usernameInput = screen.getByTestId('username-input');
			const passwordInput = screen.getByTestId('password-input');
			const logInSubmitButton = screen.getByTestId('log-in-submit');

			await userEvent.type(usernameInput, 'username');
			await userEvent.type(passwordInput, 'password');
			userEvent.click(logInSubmitButton);

			const inputMessage = await screen.findByTestId('input-messages');
			expect(inputMessage).toBeEmptyDOMElement();
		});
	});
});
