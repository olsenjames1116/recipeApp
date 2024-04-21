import { http, HttpResponse } from 'msw';

const message = {
	data: {
		message: [
			'Your account has been created. You will be redirected to log in.',
		],
	},
};

export const handlers = [
	http.get('http://localhost:3000/user/logged-out', () => {
		return HttpResponse.json();
	}),
	http.post('http://localhost:3000/user/sign-up', () => {
		console.log(message);
		return HttpResponse.json(message);
	}),
];
