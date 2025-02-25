const { defineConfig } = require("cypress");
const { addMatchImageSnapshotPlugin } = require("cypress-image-snapshot/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
      return config; 
    },
    baseUrl: "https://www.annex.com.au/",
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js', 
  },
});
