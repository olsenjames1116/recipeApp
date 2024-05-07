import { app } from '../app';
const request = require('supertest');

const logInUser = () => {
	return request(app).post('/user/log-in').send({
		username: 'testUser',
		password: '123',
	});
};

describe('Ingredients', () => {
	it("should store a user's ingredients.", (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.post('/user/store-ingredients')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.send({
					ingredients: [
						{ _id: '6605ee0f2627a3160ddd0b62', name: 'bread crumbs' },
					],
				})
				.end(function (err: Error, res: any) {
					expect(res.body.ingredients);
					done();
				});
		});
	});

	it("should return a user's ingredients.", (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.get('/user/saved-ingredients')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.end(function (err: Error, res: any) {
					expect(res.body.ingredients);
					done();
				});
		});
	});
});
