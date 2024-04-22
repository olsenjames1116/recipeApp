import ConfirmPasswordInput from '../ConfirmPasswordInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const mockRef = {
	current: null,
};

describe('ConfirmPasswordInput', () => {
	it('should render component', () => {
		render(
			<ConfirmPasswordInput
				handleChange={() => {}}
				confirmPasswordRef={mockRef}
			/>
		);
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');

		expect(confirmPasswordInput).toBeInTheDocument();
	});

	it('should call handleChange when input changes', async () => {
		const mockHandleChange = vi.fn();
		render(
			<ConfirmPasswordInput
				handleChange={mockHandleChange}
				confirmPasswordRef={mockRef}
			/>
		);
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');

		await userEvent.type(confirmPasswordInput, 'password');

		expect(mockHandleChange).toHaveBeenCalledTimes(8);
	});
});
