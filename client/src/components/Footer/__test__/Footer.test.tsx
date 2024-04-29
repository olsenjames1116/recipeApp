import Footer from '../Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
	it('should render component.', () => {
		render(<Footer />);
		const footer = screen.getByTestId('footer');

		expect(footer).toBeInTheDocument();
	});
});
