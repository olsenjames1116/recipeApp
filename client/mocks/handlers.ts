import { DefaultBodyType, HttpResponse, http } from 'msw';

interface DataInterface {
	username?: string;
	password?: string;
	confirmPassword?: string;
}

export const handlers = [
	http.post('http://localhost:3000/user/sign-up', async ({ request }) => {
		const data: DataInterface | DefaultBodyType = await request.json();

		if (typeof data === 'object') {
			if (data?.password !== 'password') {
				return HttpResponse.json({ message: ['Invalid password.'] });
			}
			if (data?.username === 'demo') {
				return HttpResponse.json({
					message: [`Username "demo" is already in use.`],
				});
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
	http.get('https://api.spoonacular.com/food/trivia/random', ({ request }) => {
		const url = new URL(request.url);
		const apiKey = url.searchParams.get('apiKey');

		if (!apiKey) {
			return new HttpResponse(null, { status: 404 });
		}

		return HttpResponse.json({ text: 'food fact' });
	}),
];
