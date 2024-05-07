import { app } from '../app';
const request = require('supertest');

const logInUser = () => {
	return request(app).post('/user/log-in').send({
		username: 'testUser',
		password: '123',
	});
};

const logOutUser = (done: jest.DoneCallback) => {
	request(app).delete('/user/log-out');
	done();
};

describe('authentication routes and controllers', () => {
	describe('Happy Path', () => {
		it('should return ok if user is logged in.', (done) => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.get('/user/authenticate')
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.expect(200);
			});

			logOutUser(done);
		});

		it('should return ok if user is not logged in.', (done) => {
			request(app).get('/user/logged-out').expect(200, done);
		});

		it('should return ok and log user out.', (done) => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.delete('/user/log-out')
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.expect(200, done);
			});
		});
	});

	describe('Error Path', () => {
		it('should return an error if the user is logged in.', (done) => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.get('/user/logged-out')
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.expect(403, done);
			});

			logOutUser(done);
		});

		it('should return an error if the user is not logged in.', (done) => {
			request(app).get('/user/authenticate').expect(403, done);
		});
	});
});
