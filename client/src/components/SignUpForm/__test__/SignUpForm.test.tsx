import { BrowserRouter } from 'react-router-dom';
import SignUpForm from '../SignUpForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

const server = setupServer(
	http.post('http://localhost:3000/user/sign-up', () => {
		return HttpResponse.json({
			message: [
				'Your account has been created. You will be redirected to log in.',
			],
		});
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

	it('should display an error message if username is empty.', async () => {
		render(<MockSignUpForm />);
		const passwordInput = screen.getByTestId('password-input');
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');
		const signUpSubmitButton = screen.getByTestId('signup-submit-button');

		await userEvent.type(passwordInput, 'password');
		await userEvent.type(confirmPasswordInput, 'password');
		userEvent.click(signUpSubmitButton);

		const inputMessage = await screen.findByText(
			/username must not be empty./i
		);
		expect(inputMessage).toBeInTheDocument();
	});

	it('should display an error message if password is empty.', async () => {
		render(<MockSignUpForm />);
		const usernameInput = screen.getByTestId('username-input');
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');
		const signUpSubmitButton = screen.getByTestId('signup-submit-button');

		await userEvent.type(usernameInput, 'username');
		await userEvent.type(confirmPasswordInput, 'password');
		userEvent.click(signUpSubmitButton);

		const inputMessage = await screen.findByText(
			/password must not be empty./i
		);
		expect(inputMessage).toBeInTheDocument();
	});

	it('should display an error message if confirmation password is empty.', async () => {
		render(<MockSignUpForm />);
		const usernameInput = screen.getByTestId('username-input');
		const passwordInput = screen.getByTestId('password-input');
		const signUpSubmitButton = screen.getByTestId('signup-submit-button');

		await userEvent.type(usernameInput, 'username');
		await userEvent.type(passwordInput, 'password');
		userEvent.click(signUpSubmitButton);

		const inputMessage = await screen.findByText(
			/confirmation password must not be empty./i
		);
		expect(inputMessage).toBeInTheDocument();
	});

	it('should display an error message if passwords do not match.', async () => {
		render(<MockSignUpForm />);
		const usernameInput = screen.getByTestId('username-input');
		const passwordInput = screen.getByTestId('password-input');
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');
		const signUpSubmitButton = screen.getByTestId('signup-submit-button');

		await userEvent.type(usernameInput, 'username');
		await userEvent.type(passwordInput, 'password');
		await userEvent.type(confirmPasswordInput, 'passw0rd');
		userEvent.click(signUpSubmitButton);

		const inputMessage = await screen.findByText(/passwords must match./i);
		expect(inputMessage).toBeInTheDocument();
	});

	it('should display success message if data is valid.', async () => {
		render(<MockSignUpForm />);
		const usernameInput = screen.getByTestId('username-input');
		const passwordInput = screen.getByTestId('password-input');
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');
		const signUpSubmitButton = screen.getByTestId('signup-submit-button');

		await userEvent.type(usernameInput, 'username');
		await userEvent.type(passwordInput, 'password');
		await userEvent.type(confirmPasswordInput, 'password');
		userEvent.click(signUpSubmitButton);

		const inputMessage = await screen.findByText(
			/your account has been created. you will be redirected to log in./i
		);
		screen.debug();
		expect(inputMessage).toBeInTheDocument();
	});
});