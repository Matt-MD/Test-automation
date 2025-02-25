describe('Open Website Test', () => {
    it('should load the website successfully', () => {
      // Replace 'https://example.com' with the URL of the website you want to test
      cy.visit('https://exmaple.com');
  
      // Verify that the URL is correct after visiting
      cy.url().should('include', 'https://exmaple.com');
  
      // Optional: Verify that the page has loaded by checking for a specific element
      cy.get('specific-element').should('be.visible');
    });
  });
  