import { Provider } from 'react-redux';
import IngredientSearchMenu from '../IngredientSearchMenu';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

interface IngredientSearchMenuProps {
	menuRef: React.RefObject<HTMLDivElement>;
	displayMenu: boolean;
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockMenuRef = {
	current: null,
};

const MockIngredientSearchMenu = ({
	menuRef,
	displayMenu,
	setDisplayMenu,
}: IngredientSearchMenuProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientSearchMenu
					menuRef={menuRef}
					displayMenu={displayMenu}
					setDisplayMenu={setDisplayMenu}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientSearchMenu', () => {
	it('should render component.', () => {
		render(
			<MockIngredientSearchMenu
				menuRef={mockMenuRef}
				displayMenu={true}
				setDisplayMenu={vi.fn()}
			/>
		);
		const ingredientSearchMenu = screen.getByTestId('ingredient-search-menu');

		expect(ingredientSearchMenu).toBeInTheDocument();
	});
});
