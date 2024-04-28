describe('MealPlannerPage', () => {
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
			cy.visit('http://localhost:5173/meal-planner');
		});

		afterEach(() => {
			cy.logout();
		});

		it('should add a recipe to meal planner.', () => {
			cy.get('[data-testid="meal-planner-sunday"]').click();
			cy.get(
				'[data-testid="meal-planner-recipe-0"] > [data-testid="add-meal-to-planner-button"]'
			).click();

			cy.get('[data-testid="meal-sunday"]').should('exist');
		});

		it('should delete a recipe from the meal planner.', () => {
			cy.get(
				'[data-testid="meal-sunday"] > [data-testid="meal-delete"]'
			).click();

			cy.get('[data-testid="meal-sunday"]').should('not.exist');
		});

		it('should delete all recipes from the meal planner.', () => {
			cy.get('[data-testid="meal-planner-sunday"]').click();
			cy.get(
				'[data-testid="meal-planner-recipe-0"] > [data-testid="add-meal-to-planner-button"]'
			).click();
			cy.get('[data-testid="meal-planner-monday"]').click();
			cy.get(
				'[data-testid="meal-planner-recipe-1"] > [data-testid="add-meal-to-planner-button"]'
			).click();

			cy.get('[data-testid="clear-planner-button"]').click();

			cy.get('[data-testid="meal-sunday"]').should('not.exist');
			cy.get('[data-testid="meal-monday"]').should('not.exist');
		});
	});
});
