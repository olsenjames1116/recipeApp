import Header from '../Header';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const MockHeader = ({ location }: { location: string }) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header location={location} />
			</BrowserRouter>
		</Provider>
	);
};

describe('Header', () => {
	it('should render the component.', () => {
		render(<MockHeader location="home" />);
		const header = screen.getByTestId('header');

		expect(header).toBeInTheDocument();
	});

	it('should render a component with the active class if it is selected.', () => {
		render(<MockHeader location="home" />);
		const header = screen.getByTestId('nav');

		expect(header.firstChild).toHaveClass(/active/i);
	});
});
