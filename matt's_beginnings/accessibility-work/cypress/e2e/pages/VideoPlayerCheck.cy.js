describe('Video Player Tests', () => {
    beforeEach(() => {
      cy.visit('https://example.com'); // Replace with actual URL
      cy.get('video').as('video'); // Alias for reuse
    });
  
    it('should verify that the video player is visible', () => {
      cy.get('@video').should('be.visible');
    });
  
    it('should play and pause the video', () => {
      cy.get('@video')
        .should('have.prop', 'readyState')
        .and('be.gte', 2); // Ensure video is loaded
  
      cy.get('@video').invoke('play');
      cy.get('@video').should('have.prop', 'paused', false);
  
      cy.get('@video').invoke('pause');
      cy.get('@video').should('have.prop', 'paused', true);
    });
  
    it('should check if the video duration is greater than 0', () => {
      cy.get('@video')
        .should('have.prop', 'duration')
        .and('be.greaterThan', 0);
    });
  
    it('should mute and unmute the video', () => {
      cy.get('@video')
        .invoke('prop', 'muted', true)
        .should('have.prop', 'muted', true);
  
      cy.get('@video')
        .invoke('prop', 'muted', false)
        .should('have.prop', 'muted', false);
    });
  
    it('should change the video volume', () => {
      cy.get('@video')
        .invoke('prop', 'volume', 0.5)
        .should('have.prop', 'volume', 0.5);
    });
  });
  