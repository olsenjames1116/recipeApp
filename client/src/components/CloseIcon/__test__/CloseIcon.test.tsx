import { vi } from 'vitest';
import CloseIcon from '../CloseIcon';
import { render, screen } from '@testing-library/react';

describe('CloseIcon', () => {
	it('should render component.', () => {
		render(<CloseIcon setDisplayMenu={vi.fn()} />);
		const closeIcon = screen.getByTestId('close-icon');

		expect(closeIcon).toBeInTheDocument();
	});
});
