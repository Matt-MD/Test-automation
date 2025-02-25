describe('Form Submission Test', () => {
    it('should fill out and submit the form', () => {
      // Visit the page with the form
      cy.visit('/contact-us');  // Replace with the actual URL of the form
  
      // Fill out the form fields
      cy.get('input[name="name"]').type('Matthew Meisel-Dennis');          // Enter name
      cy.get('input[name="email"]').type('matt.meisel-dennis@annex.com.au');  // Enter email
      cy.get('input[name="Company"]').type('Annex');  // Enter company
      cy.get('#field').type('Hello! This is a test message.');  // Enter message
      cy.wait(4000);
  
      // Submit the form
      //cy.get('button[type="submit"]').click();
  
      // Verification: Assert successful submission message or redirect
      //cy.contains('Thank you for your message!').should('be.visible');
      // Alternatively, check for a URL change if the form redirects
     //cy.url().should('include', '/thank-you');

      // Clear the form fields
      cy.get('input[name="name"]').clear();
      cy.get('input[name="email"]').clear();
      cy.get('input[name="Company"]').clear();
      cy.get('#field').clear();

      // Optional: Verify that the form fields are empty
      cy.get('input[name="name"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
      cy.get('input[name="Company"]').should('have.value', '');
      cy.get('#field').should('have.value', '');
    });
  });
  