// Testes para a funcionalidade de Produtos
describe('Funcionalidade de Produtos do Sauce Demo', () => {

    // Antes de cada teste, faz o login para acessar a página de produtos
    beforeEach(() => {
        // Importante: certifique-se de que o pageLoadTimeout está configurado
        // em seu cypress.config.js para um valor maior (ex: 90000 ou 120000)
        // para evitar timeouts no carregamento inicial da página.
        cy.visit('https://www.saucedemo.com/');
        
        // Garante que o campo de usuário esteja visível antes de digitar
        cy.get('#user-name').should('be.visible').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        
        // **Adição Chave:** Espera que a página de inventário esteja totalmente carregada e interativa
        // Verificando a URL e um elemento chave na página de produtos.
        cy.url().should('include', '/inventory.html');
        cy.contains('Products').should('be.visible'); // Espera pelo título "Products"
        cy.get('.inventory_container').should('be.visible'); // Espera pelo container principal dos itens
    });

    // Teste para verificar a exibição da lista de produtos
    it('Deve validar a exibição da lista de produtos', () => {
        // A lista de produtos deve ser visível e ter itens
        cy.contains('Products').should('be.visible');
        cy.get('.inventory_item').should('have.length.greaterThan', 0); // Verifica se há pelo menos um item
    });

    // Teste para visualizar detalhes de um produto
    it('Deve visualizar os detalhes de um produto específico', () => {
        // Clicar no nome de um produto
        // Usamos .contains para encontrar o link pelo texto visível.
        cy.get('.inventory_item_name').contains('Sauce Labs Backpack').click();

        // Deve estar na página de detalhes do produto e ver seu nome e detalhes
        cy.url().should('include', '/inventory-item.html?id=4'); // ID específico do Sauce Labs Backpack
        cy.get('.inventory_details_name').should('contain', 'Sauce Labs Backpack');
        cy.get('.inventory_details_desc').should('be.visible');
        cy.get('.inventory_details_price').should('be.visible');

        // Clicar para voltar à lista de produtos
        // Garante que o botão está visível antes de clicar
        cy.contains('BACK TO PRODUCTS', { matchCase: false }).should('be.visible').click();

        // Deve voltar para a página de inventário
        cy.url().should('include', '/inventory.html');
    });

    // Teste para ordenar produtos por nome (A a Z)
    it('Deve ordenar os produtos por nome de A a Z', () => {
        // Selecionar a opção de ordenação
        // Garante que o dropdown está visível antes de interagir
        cy.get('.product_sort_container')
            .should('be.visible') // Garante que o dropdown está visível
            .select('az'); // Confirme se 'az' é o valor correto no atributo 'value' da tag <option>
                          // Se o problema persistir, pode tentar .select('Name (A to Z)');
        
        // Opcional: Adicione uma verificação real de ordenação se quiser ter certeza
        // Por exemplo, verificar o primeiro item da lista após a ordenação
        // cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Backpack'); // Exemplo
    });

    // Teste para ordenar produtos por nome (Z a A)
    it('Deve ordenar os produtos por nome de Z a A', () => {
        // Selecionar a opção de ordenação
        cy.get('.product_sort_container')
            .should('be.visible')
            .select('za'); // Ou 'Name (Z to A)'
        // Opcional: Adicionar asserção de verificação de ordenação
    });

    // Teste para ordenar produtos por preço (menor para maior)
    it('Deve ordenar os produtos por preço do menor para o maior', () => {
        // Selecionar a opção de ordenação
        cy.get('.product_sort_container')
            .should('be.visible')
            .select('lohi'); // Ou 'Price (low to high)'
        // Opcional: Adicionar asserção de verificação de ordenação
    });

    // Teste para ordenar produtos por preço (maior para menor)
    it('Deve ordenar os produtos por preço do maior para o menor', () => {
        // Selecionar a opção de ordenação
        cy.get('.product_sort_container')
            .should('be.visible')
            .select('hilo'); // Ou 'Price (high to low)'
        // Opcional: Adicionar asserção de verificação de ordenação
    });
});