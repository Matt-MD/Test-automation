function terminalLog(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      })
    )
  
    cy.task('table', violationData)
  }
  
  describe('AER search', () => {
    it('has no accesibility errors on the homepage', () => {
      cy.visit('/');
      cy.injectAxe();
  
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        },
        rules: {
          //'aria-roles': { enabled: false } // This will ignore the aria-roles error
        }
      }, terminalLog);
    })
  })