describe('HomePage', () => {
	it('should redirect an unauthenticated user to log in page', () => {
		cy.visit('http://localhost:5173');

		cy.url().should('match', /\/log-in$/);
	});
});
