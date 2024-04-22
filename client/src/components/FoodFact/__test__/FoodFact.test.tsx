import FoodFact from '../FoodFact';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('FoodFact', () => {
	it('should retrieve and display a random food fact on render.', async () => {
		render(<FoodFact />);

		const foodFact = await screen.findByTestId('food-fact');

		expect(foodFact).toHaveTextContent(/food fact/);
	});
});
