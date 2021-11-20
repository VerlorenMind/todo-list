describe('Check login', () => {
    beforeEach(() => {
        // User goes to the page, only to be greeted with a login form
        cy.visit('http://localhost:8000');
        cy.contains('Todo Lists app');
        // Site redirects to login form
        cy.url().should('include', 'login')
    })

    it('Submitting empty credentials', () => {
        // User submits empty form
        cy.get('button[type=submit]').click();
        cy.intercept('POST', 'api/token-auth/', {
            statusCode: 400,
            body: {
                username: 'This field may not be blank.',
                password: 'This field may not be blank.',
            }
        });
        // Users sees the warnings
        cy.get('input[name=\'username\']').parent().should('contain', 'This field may not be blank.');
        cy.get('input[name=\'password\']').parent().should('contain', 'This field may not be blank.');
    })

    it("Submitting wrong credentials", () => {
        // User submits bogus credentials
        cy.get('input[name=\'username\']').type('wrong_login');
        cy.get('input[name=\'password\']').type('wrong_password');
        cy.get('button[type=submit]').click();
        cy.intercept('POST', 'api/token-auth/', {
            statusCode: 400,
            body: {
                non_field_errors: 'Unable to log in with provided credentials.',
            }
        });
        // User sees the warning
        cy.contains('Unable to log in with provided credentials.');
    })

    it("Submitting correct credentials", () => {
        cy.get('input[name=\'username\']').type('correct_login');
        cy.get('input[name=\'password\']').type('correct_password');
        cy.intercept('POST', 'api/token-auth/', {
            statusCode: 200,
            body: {
                token: 'token',
            }
        });
        // Intercepting GET on users list
        cy.intercept('GET', 'api/lists/', {
            statusCode: 200,
            body: [],
        });
        cy.get('button[type=submit]').click();
        // User now can see his profile, the log out button and the link to create a new list
        cy.get('button').should('contain', 'Log Out')
        cy.get('a').should('have.attr', 'href').and('include', '/create-list')
    })
})