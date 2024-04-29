import { DefaultBodyType, HttpResponse, http } from 'msw';
import { SignUpInterface, LogInInterface } from '../src/types';

let timesCalled = 0;

export const handlers = [
	http.post('http://localhost:3000/user/sign-up', async ({ request }) => {
		const data: SignUpInterface | DefaultBodyType = await request.json();

		if (typeof data === 'object') {
			if (data?.username !== 'username') {
				return HttpResponse.json(
					{
						message: [`Username "${data?.username}" is already in use.`],
					},
					{ status: 400 }
				);
			}
		}

		return HttpResponse.json({
			message: [
				'Your account has been created. You will be redirected to log in.',
			],
		});
	}),
	http.get('http://localhost:3000/user/logged-out', () => {
		return HttpResponse.json();
	}),
	http.post('http://localhost:3000/user/log-in', async ({ request }) => {
		const data: LogInInterface | DefaultBodyType = await request.json();

		if (typeof data === 'object') {
			if (data?.username !== 'username') {
				return HttpResponse.json(
					{
						message: [`Username "${data?.username}" does not exist.`],
					},
					{ status: 400 }
				);
			}
			if (data?.password !== 'password') {
				return HttpResponse.json(
					{
						message: [`Invalid password.`],
					},
					{ status: 400 }
				);
			}
		}

		return HttpResponse.json();
	}),
	http.get('http://localhost:3000/user/authenticate', () => {
		return new HttpResponse(null, { status: 200 });
	}),
	http.get('http://localhost:3000/ingredients', () => {
		return HttpResponse.json({
			allStoredIngredients: [
				{ _id: '1234', name: 'bacon' },
				{ _id: '4567', name: 'chicken' },
				{ _id: '8901', name: 'garlic' },
			],
			userIngredients: [{ _id: '4567', name: 'chicken' }],
		});
	}),
	http.get('http://localhost:3000/user/recipes', () => {
		timesCalled += 1;

		if (timesCalled < 2) {
			return HttpResponse.json({
				recipes: [],
			});
		}

		return HttpResponse.json({
			recipes: [
				{
					title: 'Chicken Parm',
					image: 'chickenparm.png',
					url: 'http://fakepage.com',
					id: 1234,
					timestamp: Date.now(),
					_id: '1234',
				},
			],
		});
	}),
	http.get('https://api.spoonacular.com/food/trivia/random', ({ request }) => {
		const url = new URL(request.url);
		const apiKey = url.searchParams.get('apiKey');

		if (!apiKey) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({ text: 'food fact' });
	}),
	http.get('https://api.spoonacular.com/recipes/random', ({ request }) => {
		const url = new URL(request.url);
		const apiKey = url.searchParams.get('apiKey');

		if (!apiKey) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({
			recipes: [
				{
					title: 'Chicken Parmesan',
					image: 'chickenparm.png',
					sourceUrl: 'http://fakepage.com',
					id: 1234,
				},
			],
		});
	}),
];
