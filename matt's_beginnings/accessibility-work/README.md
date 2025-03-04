# Accessibility work



## Getting started

Need to install the following:

- Cypress
- Wick-a11y
-cypress-real-events




## Wick-a11y

The package `wick-a11y` requires Cypress version ^13.17.0 as a peer dependency, Wick-a11y doesn't work with Cypress version 14.0.2.
Opions:
1. Downgrade Cypress to version 13.17.0
   npm uninstall cypress
   npm install cypress@13.17.0
   npm install wick-a11y
2. --legacy-peer-deps
   npm install wick-a11y --legacy-peer-deps
3. --force
npm install wick-a11y --force

Once installed, you can add the following to your `cypress.config.js` file:

```js
const { defineConfig } = require("cypress");
// Import the accessibility tasks from wick-a11y plugin
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
       // Add accessibility tasks
      addAccessibilityTasks(on);
    },
  },
});
## If runnig the AccessibilitySuite.cy.js file
npm install --save-dev cypress-axe axe-core cypress-plugin-tab
If doesn't work, try: npm install --save-dev cypress-axe axe-core cypress-plugin-tab --legacy-peer-deps
Once installed, you can add the following to your `cypress.config.js` file: const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
Then need to update cypress/support/e2e.js 
     import 'cypress-axe';
import 'cypress-plugin-tab';

// Custom command for checking accessibility
Cypress.Commands.add('checkAccessibility', () => {
  cy.checkA11y(null, {
    includedImpacts: ['critical', 'serious', 'moderate'],
    reporter: 'verbose'    
    ## adding cypress-real-events
    npm install --save-dev cypress-real-events --legacy-peer-deps
    cypress/support/e2e.js 
    //add this
    import 'cypress-real-events/support';

  },
});
