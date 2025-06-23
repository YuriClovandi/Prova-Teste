// Testes para a funcionalidade do Carrinho
describe('Funcionalidade do Carrinho do Sauce Demo', () => {

    // Antes de cada teste, faz o login para acessar a página de produtos
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/')
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
    });
  
    // Teste para adicionar e validar produtos no carrinho
    it('Deve adicionar produtos ao carrinho e validar os itens', () => {
      //Adicionar dois produtos ao carrinho
      cy.get('button.btn_primary').contains('Add to cart').click(); // Adiciona o primeiro produto
      cy.get('.shopping_cart_badge').should('contain', '1'); // Verifica que o badge mostra 1
      cy.get('button.btn_primary').contains('Add to cart').click(); // Adiciona o segundo produto
      cy.get('.shopping_cart_badge').should('contain', '2'); // Verifica que o badge mostra 2
  
      //Ir para a página do carrinho
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
    });
  
    // Teste para remover produtos do carrinho
    it('Deve remover produtos do carrinho', () => {
      //Adicionar um produto
      cy.get('.btn_primary').contains('Add to cart').first().click();
      cy.get('.shopping_cart_badge').should('contain', '1');
  
      //Ir para a página do carrinho
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
  
      //Remover o produto
      cy.get('.btn_secondary').contains('Remove').click();
    });
  
  });