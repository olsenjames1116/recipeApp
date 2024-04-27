describe('RecipesPage', () => {
	describe('Unauthenticated user', () => {
		it('should redirect an unauthenticated user to log in page', () => {
			cy.visit('http://localhost:5173');

			cy.url().should('match', /\/log-in$/);
		});
	});

	describe('Authenticated user', () => {
		beforeEach(() => {
			cy.login();
		});

		afterEach(() => {
			cy.logout();
		});

		it('should delete a saved recipe.', () => {
			cy.get('[data-testid="random-recipe-button"]').click();
			cy.get('[data-testid="save-recipe-container"]').click();
			('[data-testid="recipe-list-item-0"] > [data-testid="recipe-list-item-delete"]');
			cy.get('[data-testid="recipe-list-item-0"]').then(
				(element: JQuery<HTMLElement>) => {
					cy.get(
						'[data-testid="recipe-list-item-0"] > [data-testid="recipe-list-item-delete"]'
					).click();

					cy.get(`${element['0'].dataset.testid}`).should('not.exist');
				}
			);
		});

		it("should link you recipe's site when recipe card is clicked.", () => {
			cy.wait(500);
			cy.visit('http://localhost:5173/recipes');

			cy.get(
				'[data-testid="recipe-list-item-0"] > [data-testid="recipe-list-item-link"]'
			)
				.should('have.attr', 'href')
				.should('match', /foodista/i);
		});
	});
});
