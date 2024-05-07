import { app } from '../app';
import User from '../models/user';
import { IGrocery } from '../utils/types';
const request = require('supertest');

const logInUser = () => {
	return request(app).post('/user/log-in').send({
		username: 'testUser',
		password: '123',
	});
};

let grocery: IGrocery | undefined;

const getGroceryId = async () => {
	const user = await User.findOne({ username: 'testUser' });
	grocery = user?.groceries.find((grocery) => grocery?.name === 'cherries');
};

describe('Groceries', () => {
	it('should store a grocery item for a user.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.post('/user/save-grocery-item')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.send({
					item: 'cherries',
				})
				.end(function (err: Error, res: any) {
					expect(res.body.groceries);
					done();
				});
		});
	});

	it('should return an error if the grocery item is empty.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.post('/user/save-grocery-item')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.send({
					item: '',
				})
				.expect(400, done);
		});
	});

	it('should return an error if the grocery item is too long.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.post('/user/save-grocery-item')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.send({
					item: 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
				})
				.expect(400, done);
		});
	});

	it('should get the stored groceries for a user.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.get('/user/groceries')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.end(function (err: Error, res: any) {
					expect(res.body.groceries);
					done();
				});
		});
	});

	it('should post a checked attribute to a grocery item.', (done) => {
		getGroceryId().then(() => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.post('/user/grocery')
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.send({
						id: grocery?._id,
						checked: true,
					})
					.end(function (err: Error, res: any) {
						expect(res.body.groceries);
						done();
					});
			});
		});
	});

	it("should delete a grocery item from a user's list.", (done) => {
		getGroceryId().then(() => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.delete(`/user/grocery/${grocery?._id}`)
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.end(function (err: Error, res: any) {
						expect(res.body.groceries);
						done();
					});
			});
		});
	});

	it("should delete all items from a user's list.", (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.delete('/user/groceries')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.end(function (err: Error, res: any) {
					expect(res.body.groceries);
					done();
				});
		});
	});
});
