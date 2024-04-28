import LogOut from '../LogOut';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

const MockLogOut = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<LogOut />
			</BrowserRouter>
		</Provider>
	);
};

describe('LogOut', () => {
	it('should render component.', () => {
		render(<MockLogOut />);
		const logOut = screen.getByTestId('log-out-button');

		expect(logOut).toBeInTheDocument();
	});
});
