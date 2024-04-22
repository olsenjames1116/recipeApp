import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from '../src/__mocks__/server';

beforeAll(() => server.listen());

afterEach(() => {
	cleanup();
	server.resetHandlers();
});

afterAll(() => server.close());
