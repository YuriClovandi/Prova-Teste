// Testes para a funcionalidade de Checkout
describe('Funcionalidade de Checkout do Sauce Demo', () => {

    // Antes de cada teste, faz o login e adiciona produtos ao carrinho
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');

        // Adicionar o primeiro produto pelo nome para garantir
        cy.get('.inventory_item_name').contains('Sauce Labs Backpack')
          .parents('.inventory_item')
          .find('.btn_primary')
          .click();
        cy.get('.shopping_cart_badge').should('contain', '1');

        // Adicionar o segundo produto pelo nome para garantir
        cy.get('.inventory_item_name').contains('Sauce Labs Bike Light')
          .parents('.inventory_item')
          .find('.btn_primary') // Botão 'Add to cart'
          .click();
        cy.get('.shopping_cart_badge').should('contain', '2');

        // Ir para a página do carrinho
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
    });

    // Teste para iniciar e finalizar a compra com sucesso
    it('Deve iniciar, preencher dados, validar resumo e finalizar compra com sucesso', () => {
      //Iniciar processo de checkout
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one.html');

      //Preencher dados obrigatórios (nome, sobrenome, CEP)
      cy.get('#first-name').type('Yuri');
      cy.get('#last-name').type('Clovandi');
      cy.get('#postal-code').type('70000-000');
      cy.get('[data-test="continue"]').click();
      cy.url().should('include', '/checkout-step-two.html');

      //Validar resumo da compra (itens e valores)
      cy.get('.summary_info').should('be.visible');
      cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Backpack');
      cy.get('.inventory_item_name').last().should('contain', 'Sauce Labs Bike Light');
      cy.get('.summary_subtotal_label').should('be.visible');
      cy.get('.summary_tax_label').should('be.visible');
      cy.get('.summary_total_label').should('be.visible');

      //Finalizar compra
      cy.get('[data-test="finish"]').click();

    });

    // Teste para exibir erro ao tentar finalizar checkout sem dados obrigatórios
    it('Deve exibir erro ao tentar finalizar checkout sem preencher todos os dados obrigatórios', () => {
      // **Ação: Garantir que estamos na página do carrinho antes de clicar em CHECKOUT**
      // (Esta parte já está coberta pelo beforeEach para o primeiro teste,
      // mas como este é um novo 'it', ele começará do 'beforeEach' novamente.
      // Se fosse um fluxo mais complexo, poderíamos ter um 'before' ou um 'context' separado.)

      //Clicar no botão CHECKOUT (que está na página do carrinho)
      cy.get('[data-test="checkout"]').click(); // Esta linha agora deve funcionar
      cy.url().should('include', '/checkout-step-one.html'); // Verifica que está na primeira etapa do checkout

      //Tentar continuar sem preencher nada
      cy.get('[data-test="continue"]').click();
      // Verificação: Erro para nome
      cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');

      //Preencher nome e tentar continuar
      cy.get('#first-name').type('Yuri');
      cy.get('[data-test="continue"]').click();
      // Verificação: Erro para sobrenome
      cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required');

      //Preencher sobrenome e tentar continuar
      cy.get('#last-name').type('Clovandi');
      cy.get('[data-test="continue"]').click();
      //Erro para CEP
      cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required');
    });

});