import GoogleAuthForm from '../GoogleAuthForm';
import { render, screen } from '@testing-library/react';

describe('GoogleAuthForm', () => {
	it('should render component.', () => {
		render(<GoogleAuthForm />);
		const googleAuthForm = screen.getByTestId('google-auth-form');

		expect(googleAuthForm).toBeInTheDocument();
	});
});
