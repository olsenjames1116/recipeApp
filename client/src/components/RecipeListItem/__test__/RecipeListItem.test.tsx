import { Provider } from 'react-redux';
import RecipeListItem from '../RecipeListItem';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { IRecipeWithId } from '../../../types';

interface RecipeListItemProps {
	recipe: IRecipeWithId;
	index: number;
}

const MockRecipeListItem = ({ recipe, index }: RecipeListItemProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<RecipeListItem recipe={recipe} index={index} />
			</BrowserRouter>
		</Provider>
	);
};

describe('RecipeListItem', () => {
	it('should render component.', () => {
		render(
			<MockRecipeListItem
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				index={0}
			/>
		);
		const recipeListItem = screen.getByTestId('recipe-list-item-0');

		expect(recipeListItem).toBeInTheDocument();
	});

	it('should have a link to recipe url.', () => {
		render(
			<MockRecipeListItem
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				index={0}
			/>
		);
		const recipeListItemLink = screen.getByTestId('recipe-list-item-link-0');

		expect(recipeListItemLink).toHaveAttribute('href', 'http://fakepage.com');
	});

	it('should have an image with src for a recipe.', () => {
		render(
			<MockRecipeListItem
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				index={0}
			/>
		);
		const recipeListItemImage = screen.getByTestId('recipe-list-item-image-0');

		expect(recipeListItemImage).toHaveAttribute('src', 'chickenparm.png');
	});

	it('should display the name of a recipe.', () => {
		render(
			<MockRecipeListItem
				recipe={{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					_id: '1234',
				}}
				index={0}
			/>
		);
		const recipeListItemTitle = screen.getByTestId('recipe-list-item-title-0');

		expect(recipeListItemTitle).toHaveTextContent(/chicken parm/i);
	});
});
