import { app } from '../app';
const request = require('supertest');
import User from '../models/user';

beforeAll(async () => {
	await User.findOneAndDelete({ username: 'testUser2' });
});

describe('/user/sign-up', () => {
	describe('Happy Path', () => {
		it('should validate and store a user.', (done) => {
			request(app)
				.post('/user/sign-up')
				.send({
					username: 'testUser2',
					password: '123',
					confirmPassword: '123',
				})
				.expect(201, done);
		});
	});

	describe('Error Path', () => {
		describe('Username Errors', () => {
			it('should return an error if username is empty.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({ username: '', password: '123', confirmPassword: '123' })
					.expect(400, done);
			});
			it('should return an error if username already exists in database.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({
						username: 'demo',
						password: '123',
						confirmPassword: '123',
					})
					.expect(400, done);
			});
			it('should return an error if username is too long.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({
						username: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
						password: '123',
						confirmPassword: '123',
					})
					.expect(400, done);
			});
		});
		describe('Password Errors', () => {
			it('should return an error if password is empty.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({ username: 'testUser3', password: '', confirmPassword: '123' })
					.expect(400, done);
			});

			it('should return an error if passwords are too long.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({
						username: 'testUser3',
						password: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
						confirmPassword:
							'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
					})
					.expect(400, done);
			});
		});
		describe('Confirmation Password Errors', () => {
			it('should return an error if confirmation password is empty.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({
						username: 'testUser3',
						password: '123',
						confirmPassword: '',
					})
					.expect(400, done);
			});

			it('should return an error if passwords do not match.', (done) => {
				request(app)
					.post('/user/sign-up')
					.send({
						username: 'testUser3',
						password: '123',
						confirmPassword: '456',
					})
					.expect(400, done);
			});
		});
	});
});
