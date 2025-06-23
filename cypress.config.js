// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com', // Optional: set base URL for cleaner cy.visit('/')
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 120000, // Aumenta para 120 segundos (2 minutos)
  },
});