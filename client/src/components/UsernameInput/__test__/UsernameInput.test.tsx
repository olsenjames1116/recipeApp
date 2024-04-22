import UsernameInput from '../UsernameInput';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockRef = {
	current: null,
};

describe('UsernameInput', () => {
	it('should render component', () => {
		render(<UsernameInput handleChange={() => {}} usernameRef={mockRef} />);
		const usernameInput = screen.getByTestId('username-input');

		expect(usernameInput).toBeInTheDocument();
	});

	it('should call handleChange when input changes', async () => {
		const mockHandleChange = vi.fn();
		render(
			<UsernameInput handleChange={mockHandleChange} usernameRef={mockRef} />
		);
		const usernameInput = screen.getByTestId('username-input');

		await userEvent.type(usernameInput, 'username');

		expect(mockHandleChange).toHaveBeenCalledTimes(8);
	});
});
