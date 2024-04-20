import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

const successMessage = {
	data: {
		response: {
			message: [
				'Your account has been created. You will be redirected to log in.',
			],
		},
	},
};

export const restHandlers = [
	http.get('http://localhost:3000/user/sign-up', () => {
		return HttpResponse.json(successMessage);
	}),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => {
	cleanup();
	server.resetHandlers();
});
