// End to end tests for a user logging in.
describe('LogInPage', () => {
	it('should redirect user to home page on successful log in', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-cy="username-input"]').type('testUser1');
		cy.get('[data-cy="password-input"]').type('password123');

		cy.get('[data-cy="log-in-submit"]').click();

		cy.url().should('match', /\/$/);
	});

	it('should display error message if username does not exist.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-cy="username-input"]').type('testUser10');
		cy.get('[data-cy="password-input"]').type('password123');

		cy.get('[data-cy="log-in-submit"]').click();

		cy.get('[data-cy="input-message-0"]').should('exist');
	});

	it('should display error message if username is empty.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-cy="password-input"]').type('password123');

		cy.get('[data-cy="log-in-submit"]').click();

		cy.get('[data-cy="input-message-0"]').should('exist');
	});

	it('should display error message if password is empty.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-cy="username-input"]').type('testUser1');

		cy.get('[data-cy="log-in-submit"]').click();

		cy.get('[data-cy="input-message-0"]').should('exist');
	});

	it('should display error message if password does not match stored password.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-cy="username-input"]').type('testUser1');
		cy.get('[data-cy="password-input"]').type('password456');

		cy.get('[data-cy="log-in-submit"]').click();

		cy.get('[data-cy="input-message-0"]').should('exist');
	});

	it('should redirect user to sign up page when link is clicked.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-cy="log-in-options"] > a').click();

		cy.url().should('match', /\/sign-up$/);
	});
});
