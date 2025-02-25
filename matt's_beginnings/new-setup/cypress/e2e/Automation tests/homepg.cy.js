describe('Open Website Test', () => {
    it('should load the website successfully', () => {
      // Replace 'https://example.com' with the URL of the website you want to test
      cy.visit('https://www.annex.com.au/');
  
      // Verify that the URL is correct after visiting
      cy.url().should('include', 'https://www.annex.com.au/');
  
      // Optional: Verify that the page has loaded by checking for a specific element
      cy.get('body > div.standard-section.homepage-hero-section.white').should('be.visible');
    });
  });
  