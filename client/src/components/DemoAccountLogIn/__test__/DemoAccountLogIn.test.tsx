import DemoAccountLogIn from '../DemoAccountLogIn';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const MockDemoAccountLogIn = () => {
	return (
		<BrowserRouter>
			<DemoAccountLogIn />
		</BrowserRouter>
	);
};

describe('DemoAccountLogIn', () => {
	it('should render component', () => {
		render(<MockDemoAccountLogIn />);
		const demoAccountLogIn = screen.getByTestId('demo-account-log-in');

		expect(demoAccountLogIn).toBeInTheDocument();
	});
});
