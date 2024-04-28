import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

const MockHomePage = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		</Provider>
	);
};

describe('HomePage', () => {
	it('should render component.', () => {
		render(<MockHomePage />);
		const homePage = screen.getByTestId('home-page');

		expect(homePage).toBeInTheDocument();
	});
});
