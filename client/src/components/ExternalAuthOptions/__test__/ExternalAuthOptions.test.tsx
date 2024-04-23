import { BrowserRouter } from 'react-router-dom';
import ExternalAuthOptions from '../ExternalAuthOptions';
import { render, screen } from '@testing-library/react';

const MockExternalAuthOptions = () => {
	return (
		<BrowserRouter>
			<ExternalAuthOptions />
		</BrowserRouter>
	);
};

describe('ExternalAuthOptions', () => {
	it('should render component', () => {
		render(<MockExternalAuthOptions />);
		const externalAuthOptions = screen.getByTestId('external-auth-options');

		expect(externalAuthOptions).toBeInTheDocument();
	});
});
