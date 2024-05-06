describe('GroceriesPage', () => {
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
			cy.visit('http://localhost:5173/groceries');
		});

		afterEach(() => {
			cy.logout();
		});

		it('should add an item to the grocery list.', () => {
			cy.get('[data-testid="groceries-form-add-button"]').click();
			cy.get('[data-testid="grocery-item-input"]').type('apples');
			cy.get('[data-testid="grocery-item-input-add-button"]').click();

			cy.get('[data-testid="grocery-list-item-0"]').should('exist');
		});

		it('should delete an item from the grocery list.', () => {
			cy.get('[data-testid="grocery-list-item-remove-button-0"]').click();

			cy.get('[data-testid="grocery-list-item-0"]').should('not.exist');
		});

		it('should delete all items from the grocery list.', () => {
			cy.get('[data-testid="groceries-form-add-button"]').click();
			cy.get('[data-testid="grocery-item-input"]').type('apples');
			cy.get('[data-testid="grocery-item-input-add-button"]').click();
			cy.get('[data-testid="grocery-item-input"]').type('bananas');
			cy.get('[data-testid="grocery-item-input-add-button"]').click();

			cy.get('[data-testid="groceries-form-clear-button"]').click();

			cy.get('[data-testid="grocery-list-item-0"]').should('not.exist');
			cy.get('[data-testid="grocery-list-item-1"]').should('not.exist');
		});
	});
});
