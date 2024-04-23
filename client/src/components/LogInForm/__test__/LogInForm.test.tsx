import { BrowserRouter } from 'react-router-dom';
import LogInForm from '../LogInForm';
import { render, screen } from '@testing-library/react';

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
		it.todo('should display an error if username is empty.');
		it.todo('should display an error if password is empty.');
		it.todo(
			'should display an error if username does not match any stored usernames.'
		);
		it.todo(
			'should display an error if password does not match any stored passwords.'
		);
	});

	describe('Happy Path', () => {
		it.todo(
			'should not display an error message if a user logs in successfully.'
		);
	});
});
