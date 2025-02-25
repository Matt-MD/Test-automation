describe('API Mocking with Update', () => {
    const apiUrl = '/api/data';
    const getDataAlias = '@getData';
    const updateDataAlias = '@updateData';
  
    beforeEach(() => {
      // Mock initial API response dynamically
      cy.intercept('GET', apiUrl, (req) => {
        req.reply({ statusCode: 200, body: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }] });
      }).as('getData');
  
      // Mock update response dynamically
      cy.intercept('PUT', apiUrl, (req) => {
        req.reply({
          statusCode: 200,
          body: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }, { id: 4, name: 'New Item' }]
        });
      }).as('updateData');
    });
  
    it('updates and displays new data', () => {
      cy.visit('/data-page');
  
      // Custom command to verify data count
      cy.verifyDataCount(3);
  
      // Ensure update button is enabled and click it
      cy.get('.update-button').should('be.enabled').click();
  
      // Wait for update request and verify response
      cy.wait(updateDataAlias).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        cy.log('Update response:', interception.response.body);
      });
  
      // Verify UI reflects updated data
      cy.verifyDataCount(4);
      cy.get('.data-item').last().should('contain.text', 'New Item');
    });
  
    it('handles API update failure gracefully', () => {
      // Mock API failure
      cy.intercept('PUT', apiUrl, { statusCode: 500, body: { error: 'Server error' } }).as('updateDataFail');
  
      cy.visit('/data-page');
      cy.verifyDataCount(3);
  
      // Click update button
      cy.get('.update-button').should('be.enabled').click();
  
      // Wait for failed request and check for error message
      cy.wait('@updateDataFail').then((interception) => {
        expect(interception.response.statusCode).to.eq(500);
        cy.log('Error response:', interception.response.body);
      });
  
      // Verify error message is displayed
      cy.get('.error-message').should('be.visible').and('contain.text', 'Failed to update data');
  
      // Ensure data remains unchanged
      cy.verifyDataCount(3);
    });
  });
  
  // Custom command for verifying item count
  Cypress.Commands.add('verifyDataCount', (count) => {
    cy.wait('@getData')
      .its('response.body')
      .should('be.an', 'array')
      .and('have.length', count);
  
    cy.get('.data-item').should('have.length', count).and('be.visible');
  });
  
  