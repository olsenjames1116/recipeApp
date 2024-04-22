import InputMessages from '../InputMessages';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('InputMessages', () => {
	it('should display a single message.', () => {
		render(<InputMessages messages={['One message.']} error={false} />);
		const inputMessage = screen.getByTestId('input-message-0');

		expect(inputMessage).toBeInTheDocument();
	});

	it('should display multiple messages.', () => {
		render(
			<InputMessages
				messages={['One message.', 'Two message.']}
				error={false}
			/>
		);
		const inputMessages = screen.getAllByTestId(/input-message-./);

		expect(inputMessages).toHaveLength(2);
	});

	it('should have an error class if the message is an error.', () => {
		render(<InputMessages messages={['One message.']} error={true} />);
		const inputMessage = screen.getByTestId('input-message-0');

		expect(inputMessage).toHaveClass(/error/);
	});
});
