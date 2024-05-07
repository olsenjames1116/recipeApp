import { app } from '../app';
import User from '../models/user';
import { IRecipe } from '../utils/types';
const request = require('supertest');

const logInUser = () => {
	return request(app).post('/user/log-in').send({
		username: 'testUser',
		password: '123',
	});
};

let recipe: IRecipe | undefined;

const getRecipeId = async () => {
	const user = await User.findOne({ username: 'testUser' });
	recipe = user?.recipes.find((recipe) => recipe.id === 4567);
};

afterAll(async () => {
	await User.findOneAndUpdate(
		{ username: 'testUser' },
		{ $pull: { recipes: { id: 4567 } } }
	);
});

describe('Planner', () => {
	it("should post a meal in a user's planner.", (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.post('/user/save-recipe')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.send({
					title: 'test recipe',
					image: 'testImage.png',
					url: 'testrecipe.com',
					id: 4567,
				})
				.end(function (err: Error, res: any) {
					request(app)
						.post('/user/store-in-planner/sunday/4567')
						.end(function (err: Error, res: any) {
							expect(res.body.planner);
							done();
						});
				});
		});
	});

	it('should get the planner from a user.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.get('/user/planner')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.end(function (err: Error, res: any) {
					expect(res.body.planner);
					done();
				});
		});
	});

	it('should delete a meal from the planner.', (done) => {
		getRecipeId().then(() => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.delete(`/user/planner/${recipe?._id}`)
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.end(function (err: Error, res: any) {
						expect(res.body.planner);
						done();
					});
			});
		});
	});

	it('should delete all meals from a planner.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.delete('/user/clear-planner')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.end(function (err: Error, res: any) {
					expect(res.body.planner);
					done();
				});
		});
	});
});
