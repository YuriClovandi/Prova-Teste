// cypress/support/commands.js
Cypress.Commands.add('loginStandardUser', () => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
    cy.contains('Products').should('be.visible');
});

// Outros comandos personalizados, se necessário