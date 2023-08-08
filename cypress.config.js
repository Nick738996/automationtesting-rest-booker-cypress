const { defineConfig } = require('cypress');
module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'https://automationintesting.online',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: [
      '**/1-getting-started/**',
      '**/2-advanced-examples/**',
    ],
    env: {
      apiUrl: 'https://automationintesting.online',
      username: 'admin',
      password: 'password',
    },
  },
});
