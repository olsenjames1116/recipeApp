import { Provider } from 'react-redux';
import IngredientInput from '../IngredientInput';
import { render, screen } from '@testing-library/react';
import { store } from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { IIngredientWithId } from '../../../types';

interface IngredientInputProps {
	ingredient: IIngredientWithId;
	checked: boolean;
	saveButtonRef: React.RefObject<HTMLButtonElement>;
	index: number;
}

const mockRef = {
	current: null,
};

const MockIngredientInput = ({
	ingredient,
	checked,
	saveButtonRef,
	index,
}: IngredientInputProps) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<IngredientInput
					ingredient={ingredient}
					checked={checked}
					saveButtonRef={saveButtonRef}
					index={index}
				/>
			</BrowserRouter>
		</Provider>
	);
};

describe('IngredientInput', () => {
	it('should render component.', () => {
		render(
			<MockIngredientInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				checked={false}
				saveButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientInput = screen.getByTestId('ingredient-input-0');

		expect(ingredientInput).toBeInTheDocument();
	});

	it("should have a value of the ingredient's name.", () => {
		render(
			<MockIngredientInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				checked={false}
				saveButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientInput = screen.getByTestId('ingredient-input-0');

		expect(ingredientInput).toHaveAttribute('value', 'bacon');
	});

	it('should have a checked value if the user has the ingredient stored.', () => {
		render(
			<MockIngredientInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				checked={true}
				saveButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientInput = screen.getByTestId('ingredient-input-0');

		expect(ingredientInput).toHaveAttribute('checked');
	});

	it('should not have a checked value if the user does not have an ingredient scored.', () => {
		render(
			<MockIngredientInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				checked={false}
				saveButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientInput = screen.getByTestId('ingredient-input-0');

		expect(ingredientInput).not.toHaveAttribute('checked');
	});

	it("should have a label with an ingredient's name.", () => {
		render(
			<MockIngredientInput
				ingredient={{ _id: '1234', name: 'bacon' }}
				checked={false}
				saveButtonRef={mockRef}
				index={0}
			/>
		);
		const ingredientInput = screen.getByTestId('ingredient-input-label-0');

		expect(ingredientInput).toHaveTextContent(/bacon/i);
	});
});
