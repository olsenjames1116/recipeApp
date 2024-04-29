import GenerateRecipes from '../GenerateRecipes';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

interface GenerateRecipesProps {
	setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MockGenerateRecipes = ({ setDisplayMenu }: GenerateRecipesProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<GenerateRecipes setDisplayMenu={setDisplayMenu} />
			</BrowserRouter>
		</Provider>
	);
};

describe('GenerateRecipes', () => {
	it('should render component.', () => {
		render(<MockGenerateRecipes setDisplayMenu={vi.fn()} />);
		const generateRecipes = screen.getByTestId('generate-recipes');

		expect(generateRecipes).toBeInTheDocument();
	});
});
