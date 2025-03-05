# Accessibility work

## Getting started

This project uses the following tools for accessibility testing:

* Cypress
* Wick-a11y
* cypress-real-events
* cypress-axe
* axe-core
* cypress-plugin-tab

All dependencies are already included in `package.json`.

## Wick-a11y

Note: Wick-a11y requires Cypress version `^13.17.0` as a peer dependency and doesn't work with Cypress version `14.0.2`.

### Configuration for `cypress.config.js`

```javascript
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
```

## Configuration for `AccessibilitySuite.cy.js`

Configuration for your `cypress.config.js` file:

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
  },
});
```

## Update `cypress/support/e2e.js`

```javascript
import 'cypress-axe';
import 'cypress-plugin-tab';
import 'cypress-real-events/support';

// Custom command for checking accessibility
Cypress.Commands.add('checkAccessibility', () => {
  cy.checkA11y(null, {
    includedImpacts: ['critical', 'serious', 'moderate'],
    reporter: 'verbose'
    // ## adding cypress-real-events
    // npm install --save-dev cypress-real-events --legacy-peer-deps
    // cypress/support/e2e.js
    //add this
    // import 'cypress-real-events/support';

  },
});
