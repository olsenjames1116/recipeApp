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
	recipe = user?.recipes.find((recipe) => recipe.id === 1234);
};

describe('Recipes', () => {
	it('should store a recipe.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.post('/user/save-recipe')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.send({
					title: 'test recipe',
					image: 'testImage.png',
					url: 'testrecipe.com',
					id: 1234,
				})
				.expect(200, done);
		});
	});

	it('should return stored recipes.', (done) => {
		logInUser().end(function (err: Error, res: any) {
			request(app)
				.get('/user/recipes')
				.set('Accept', 'application/json')
				.set('Cookie', res.headers['set-cookie'][0])
				.end(function (err: Error, res: any) {
					expect(res.body.recipes);
					done();
				});
		});
	});

	it('should delete a recipe.', (done) => {
		getRecipeId().then(() => {
			logInUser().end(function (err: Error, res: any) {
				request(app)
					.delete(`/user/recipe/${recipe?._id}`)
					.set('Accept', 'application/json')
					.set('Cookie', res.headers['set-cookie'][0])
					.end(function (err: Error, res: any) {
						expect(res.body.recipes);
						done();
					});
			});
		});
	});
});
