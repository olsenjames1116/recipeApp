describe('HomePage', () => {
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

		it('should display a random recipe.', () => {
			cy.get('[data-testid="random-recipe-button"]').click();

			cy.get('[data-testid="generated-recipe-container"]').should('exist');
		});

		it('should display and save a random recipe.', () => {
			cy.get('[data-testid="random-recipe-button"]').click();

			cy.get('[data-testid="save-recipe-container"]').click();

			cy.url().should('match', /\/recipes$/);
		});

		it('should display a new recipe if the user does not like the current recipe.', () => {
			cy.get('[data-testid="random-recipe-button"]').click();

			cy.get('[data-testid="next-recipe-container"]').click();

			cy.get('[data-testid="generated-recipe-container"]').should('exist');
		});

		it('should take user back to home page if they want to start over.', () => {
			cy.get('[data-testid="random-recipe-button"]').click();

			cy.get('[data-testid="start-over-button"]').click();

			cy.get('[data-testid="generate-recipes-container"]').should('exist');
		});

		it('should display a random recipe if the user searches with their ingredients.', () => {
			cy.get('[data-testid="use-ingredients-button"]').click();

			cy.get('[data-testid="ingredient-search-list"]')
				.find('input')
				.first()
				.click();

			cy.get('[data-testid="submit-ingredient-search-form-button"]').click();

			cy.get('[data-testid="generated-recipe-container"]').should('exist');
		});

		describe('No ingredients selected', () => {
			afterEach(() => {
				cy.get(
					'[data-testid="ingredient-search-menu-container"] [data-testid="close-icon"]'
				).click();
			});

			it('should have disabled button if no ingredients are selected.', () => {
				cy.get('[data-testid="use-ingredients-button"]').click();

				cy.get('[data-testid="submit-ingredient-search-form-button"]').should(
					'be.disabled'
				);
			});

			it('should not search and display error if ingredients are selected then de-selected.', () => {
				cy.get('[data-testid="use-ingredients-button"]').click();

				cy.get('[data-testid="ingredient-search-list"]')
					.find('input')
					.first()
					.click();

				cy.get('[data-testid="ingredient-search-list"]')
					.find('input')
					.first()
					.click();

				cy.get('[data-testid="submit-ingredient-search-form-button"]').click();

				cy.get('[data-testid="input-messages"]').should('exist');
			});
		});
	});
});
