import { HttpResponse, http } from 'msw';

export const handlers = [
	http.post('http://localhost:3000/user/sign-up', () => {
		return HttpResponse.json({
			message: [
				'Your account has been created. You will be redirected to log in.',
			],
		});
	}),
	http.get(
		`https://api.spoonacular.com/food/trivia/random?apiKey=${
			import.meta.env.VITE_SPOONACULAR_API_KEY
		}`,
		() => {
			return HttpResponse.json({ text: 'food fact' });
		}
	),
];
