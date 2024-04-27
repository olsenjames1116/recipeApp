describe('IngredientsPage', () => {
	describe('Unauthenticated user', () => {
		it('should redirect an unauthenticated user to log in page', () => {
			cy.visit('http://localhost:5173');

			cy.url().should('match', /\/log-in$/);
		});
	});

	describe('Authenticated user', () => {
		beforeEach(() => {
			cy.login();
			cy.wait(500);
			cy.visit('http://localhost:5173/ingredients');
		});

		afterEach(() => {
			cy.logout();
		});

		it('should allow users to add and save ingredients.', () => {
			cy.get('[data-testid="ingredient-input-0"]').click();

			cy.get('[data-testid="ingredients-form-save-button"]').should(
				'be.enabled'
			);
		});

		it('should not allow user to save ingredients if no new ingredients have been selected.', () => {
			cy.get('[data-testid="ingredients-form-save-button"]').should(
				'be.disabled'
			);
		});

		it('should redirect user to homepage if they cancel input.', () => {
			cy.get('[data-testid="ingredients-form-cancel-button"]').click();

			cy.url().should('match', /\//);
		});
	});
});
