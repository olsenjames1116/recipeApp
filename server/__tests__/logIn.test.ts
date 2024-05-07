const request = require('supertest');
import { app } from '../app';

const logInUser = (username = '', password = '') => {
	return request(app).post('/user/log-in').send({
		username: username,
		password: password,
	});
};

describe('/user/log-in', () => {
	describe('Happy Path', () => {
		it('should authenticate a user.', (done) => {
			logInUser('testUser', '123').expect(200, done);
		});
	});

	describe('Error Path', () => {
		describe('Username Errors', () => {
			it('should return an error if username is empty.', (done) => {
				logInUser('', '123').expect(400, done);
			});

			it('should return an error if username is too long.', (done) => {
				logInUser(
					'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
					'123'
				).expect(400, done);
			});

			it('should return an error if username does not exist.', (done) => {
				logInUser('testUser3', '123').expect(401, done);
			});
		});

		describe('Password Errors', () => {
			it('should return an error if password is empty.', (done) => {
				logInUser('testUser2').expect(400, done);
			});

			it('should return an error if password is too long.', (done) => {
				logInUser(
					'testUser',
					'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm'
				).expect(400, done);
			});

			it('should return an error if input password does not match stored password.', (done) => {
				logInUser('testUser', '456').expect(401, done);
			});
		});
	});
});
