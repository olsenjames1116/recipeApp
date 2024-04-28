describe('LogOut', () => {
	it('should log user out and return to log in page.', () => {
		cy.login();

		cy.logout();

		cy.url().should('match', /\/log-in/);
	});
});
