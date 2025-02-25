// cypress/integration/homepageVisualTest.spec.js

describe('Homepage Visual Regression Test', () => {
    beforeEach(() => {
      // Set default Cypress configurations or visit the base URL.
      cy.visit('/');
    });
  
    it('should match the visual appearance of the homepage', () => {
      // Wait for any dynamic content to load
      cy.wait(1000); // Adjust based on load times
  
      // Take a screenshot of the entire page and compare to the baseline
      cy.matchImageSnapshot('homepage-screenshot', {
        // Options for the snapshot comparison
        failureThreshold: 0.01, // Allowable difference ratio (1% here)
        failureThresholdType: 'percent', // Can also be 'pixel' for pixel count
      });
    });
  });
  