const request = require('supertest');
import { app } from '../app';

describe('/user/log-in', () => {
	describe('Happy Path', () => {
		it('should authenticate a user.', (done) => {
			request(app)
				.post('/user/log-in')
				.send({
					username: 'demo',
					password: '123',
					confirmPassword: '123',
				})
				.expect(200, done);
		});
	});

	describe('Error Path', () => {
		describe('Username Errors', () => {
			it('should return an error if username is empty.', (done) => {
				request(app)
					.post('/user/log-in')
					.send({
						username: '',
						password: '123',
					})
					.expect(400, done);
			});

			it('should return an error if username is too long.', (done) => {
				request(app)
					.post('/user/log-in')
					.send({
						username: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmq',
						password: '123',
					})
					.expect(400, done);
			});

			it('should return an error if username does not exist.', (done) => {
				request(app)
					.post('/user/log-in')
					.send({
						username: 'testUser3',
						password: '123',
					})
					.expect(401, done);
			});
		});

		describe('Password Errors', () => {
			it('should return an error if password is empty.', (done) => {
				request(app)
					.post('/user/log-in')
					.send({
						username: 'testUser2',
						password: '',
					})
					.expect(400, done);
			});

			it('should return an error if password is too long.', (done) => {
				request(app)
					.post('/user/log-in')
					.send({
						username: 'demo',
						password: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmq',
					})
					.expect(400, done);
			});

			it('should return an error if input password does not match stored password.', (done) => {
				request(app)
					.post('/user/log-in')
					.send({
						username: 'demo',
						password: '456',
					})
					.expect(401, done);
			});
		});
	});
});
