import PasswordInput from '../PasswordInput';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockRef = {
	current: null,
};

describe('PasswordInput', () => {
	it('should render component', () => {
		render(<PasswordInput handleChange={() => {}} passwordRef={mockRef} />);
		const passwordInput = screen.getByTestId('password-input');

		expect(passwordInput).toBeInTheDocument();
	});

	it('should call handleChange when input changes', async () => {
		const mockHandleChange = vi.fn();
		render(
			<PasswordInput handleChange={mockHandleChange} passwordRef={mockRef} />
		);
		const passwordInput = screen.getByTestId('password-input');

		await userEvent.type(passwordInput, 'password');

		expect(mockHandleChange).toHaveBeenCalledTimes(8);
	});
});
