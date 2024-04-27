// End to end tests for a user signing in.
describe('SignUpForm', () => {
	it('should display a success message on a successful sign up', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('testUser1');
		cy.get('[data-testid="password-input"]').type('password123');
		cy.get('[data-testid="confirm-password-input"]').type('password123');

		cy.get('[data-testid="signup-submit-button"]').click();

		cy.get('[data-testid="input-message-0"]').should('exist');
	});

	it('should return an error message if a user tries to sign up with an existing username', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('testUser1');
		cy.get('[data-testid="password-input"]').type('password123');
		cy.get('[data-testid="confirm-password-input"]').type('password123');

		cy.get('[data-testid="signup-submit-button"]').click();

		cy.get('[data-testid="input-message-0"]').should('exist');
	});

	it('should return an error if username is empty.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="password-input"]').type('password123');
		cy.get('[data-testid="confirm-password-input"]').type('password123');

		cy.get('[data-testid="signup-submit-button"]').click();

		cy.get('[data-testid="input-message-0"]').should('exist');
	});

	it('should return an error if password is empty.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('testUser3');
		cy.get('[data-testid="password-input"]').type('password123');

		cy.get('[data-testid="signup-submit-button"]').click();

		cy.get('[data-testid="input-message-0"]').should('exist');
	});

	it('should return an error if confirmation password is empty.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('testUser4');
		cy.get('[data-testid="confirm-password-input"]').type('password123');

		cy.get('[data-testid="signup-submit-button"]').click();

		cy.get('[data-testid="input-message-0"]').should('exist');
	});

	it('should return 3 errors if all fields are empty.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="signup-submit-button"]').click();

		cy.get('[data-testid="input-messages"]')
			.find('li')
			.should('have.length', 3);
	});

	it('should redirect user to login page when link is clicked', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="sign-up-options"] > a').click();

		cy.url().should('match', /\/log-in$/);
	});

	it('should redirect user to homepage if authenticated.', () => {
		cy.login();

		cy.wait(500);
		cy.visit('http://localhost:5173/sign-up');
		cy.url().should('match', /\//);

		cy.logout();
	});
});
