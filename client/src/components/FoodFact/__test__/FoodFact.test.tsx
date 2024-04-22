import FoodFact from '../FoodFact';
import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import '@testing-library/jest-dom';

const server = setupServer(
	http.get(
		`https://api.spoonacular.com/food/trivia/random?apiKey=${
			import.meta.env.VITE_SPOONACULAR_API_KEY
		}`,
		() => {
			console.log('made it');
			return HttpResponse.json({ text: 'food fact' });
		}
	)
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('FoodFact', () => {
	it('should retrieve and display a random food fact on render.', async () => {
		render(<FoodFact />);

		const foodFact = await screen.findByTestId('food-fact');

		expect(foodFact).toHaveTextContent(/food fact/);
	});
});
