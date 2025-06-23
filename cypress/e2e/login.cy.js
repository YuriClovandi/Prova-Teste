
describe('Login e Logout do Sauce Demo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  });

  it('Deve fazer login com credenciais corretas e depois logout', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
    cy.contains('Products').should('be.visible');
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

  });

  it('Deve mostrar erro ao tentar login com credenciais incorretas', () => {
    cy.get('#user-name').type('usuario_errado');
    cy.get('#password').type('senha_errada');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Deve mostrar erro ao tentar login com usuário bloqueado', () => {
    cy.get('#user-name').type('locked_out_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });

});