const { defineConfig } = require("cypress");
// Import the accessibility tasks from wick-a11y plugin
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add accessibility tasks
      addAccessibilityTasks(on);

      // Define tasks
      on('task', {
        log(message) {
          if (typeof message === 'string') {
            console.log(`[Cypress Log]: ${message}`);
          } else {
            console.log('[Cypress Log]: Received non-string message', message);
          }
          return null;
        },
        getTimestamp() {
          return new Date().toISOString().replace(/[:.-]/g, '_');
        }
      });

      return config; // Ensure config is returned if modifications are needed
    },
    baseUrl: 'https://www.aofm.gov.au/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
  },
});