import NavItem from '../NavItem';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

interface NavItemProps {
	to: string;
	src: string;
	alt: string;
	title: string;
	className: string;
}

const MockNavItem = ({ to, src, alt, title, className }: NavItemProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavItem
					to={to}
					src={src}
					alt={alt}
					title={title}
					className={className}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('NavItem', () => {
	beforeEach(() => {
		render(
			<MockNavItem
				to="/"
				src="home.png"
				alt="Home page"
				title="Home"
				className="active"
			/>
		);
	});

	it('should render component.', () => {
		const navItem = screen.getByTestId('nav-item');

		expect(navItem).toBeInTheDocument();
	});

	it('should contain href property.', () => {
		const navItem = screen.getByTestId('nav-item');

		expect(navItem).toHaveAttribute('href', '/');
	});

	it('should contain src property.', () => {
		const navItem = screen.getByTestId('nav-item-image');

		expect(navItem).toHaveAttribute('src', 'home.png');
	});

	it('should contain alt property.', () => {
		const navItem = screen.getByTestId('nav-item-image');

		expect(navItem).toHaveAttribute('alt', 'Home page');
	});

	it('should contain title property.', () => {
		const navItem = screen.getByTestId('nav-item-title');

		expect(navItem).toHaveTextContent(/home/i);
	});

	it('should contain className property.', () => {
		const navItem = screen.getByTestId('nav-item');

		expect(navItem).toHaveClass(/active/);
	});
});
