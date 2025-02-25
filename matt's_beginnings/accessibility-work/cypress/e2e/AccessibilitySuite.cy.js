// Function to generate a timestamp in the format YYYY-MM-DD_HH-MM-SS
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, "-").slice(0, 19); // Formats as 'YYYY-MM-DD_HH-MM-SS'
}
describe('Accessibility Suite', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.injectAxe();
        cy.get('body').should('be.visible');
    });

    // Function to log violations without failing tests
    const logA11yViolations = (violations) => {
        if (violations.length) {
            cy.task('log', `${violations.length} accessibility violations detected.`);
            violations.forEach((v) => {
                cy.task('log', `Violation ID: ${v.id}`);
                cy.task('log', `Description: ${v.description}`);
                cy.task('log', `Impact: ${v.impact}`);
                cy.task('log', `Affected Elements: ${v.nodes.map(node => node.target).join(', ')}`);
            });
    
            // Fetch timestamp from Cypress task before taking a screenshot
            cy.task('getTimestamp').then((timestamp) => {
                cy.screenshot(`a11y_violations_${timestamp}`);
            });
        }
    };

    // Test entire page
    it('Should have no accessibility violations on page load', () => {
        cy.checkA11y(null, {
            runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
            }
        }, logA11yViolations);
    });

    // Test specific sections
    ['header', 'main', 'footer'].forEach((section) => {
        it(`Should have no accessibility violations in the ${section}`, () => {
            cy.get(section).should('be.visible').then(() => cy.checkA11y(section, null, logA11yViolations));
        });
    });

    // Test for proper heading structure
    it('Should have proper heading structure', () => {
        cy.checkA11y(null, { runOnly: { type: 'rule', values: ['heading-order'] } }, logA11yViolations);
    });

    // Test for image alt texts
    it('Should have proper image alt texts', () => {
        cy.checkA11y(null, { runOnly: { type: 'rule', values: ['image-alt'] } }, logA11yViolations);
    });

    // Test for color contrast
    it('Should have sufficient color contrast', () => {
        cy.checkA11y(null, { runOnly: { type: 'rule', values: ['color-contrast'] } }, logA11yViolations);
    });

    // Test for keyboard navigation
    it('Should be navigable by keyboard', () => {
        cy.get('body').trigger('keydown', { key: 'Tab' });
        cy.focused().should('exist');

        cy.get('a').first().focus().should('be.focused');
        cy.get('body').trigger('keydown', { key: 'Tab' });
        cy.focused().should('not.have.attr', 'tabindex', '-1');
    });

    // Test for skip links
    it('Should have a working skip link', () => {
        cy.get('a[href="#main"]').should('exist').click();
        cy.focused().should('have.attr', 'id', 'main');
    });

 // Test for form accessibility
it('Should have accessible form labels', () => {
    cy.get('form').each(($form) => {
        cy.wrap($form).within(() => {
            cy.get('input').each(($input) => {
                cy.wrap($input).should(($el) => {
                    expect($el).to.have.attr('aria-label').or.to.have.attr('id');
                });
            });
        });
    });

    cy.checkA11y(null, null, logA11yViolations);
});

 // Test for responsive behavior
 context('Responsive Design Accessibility', () => {
    const sizes = [
        ['mobile', 375, 667],
        ['tablet', 768, 1024],
        ['desktop', 1280, 800]
    ];

    sizes.forEach(([device, width, height]) => {
        it(`Should maintain accessibility standards on ${device}`, () => {
            cy.viewport(width, height);
            cy.visit('/'); // Ensure the page is loaded
            cy.injectAxe(); // Inject aXe-core for accessibility testing
            cy.checkA11y(null, null, logA11yViolations);
        });
    });
});

    // Test for dynamic content
    it('Should maintain accessibility after dynamic content updates', () => {
        cy.get('[data-test="open-modal"]').then(($btn) => {
            if ($btn.is(':visible')) {
                cy.wrap($btn).click();
                cy.get('[role="dialog"]').should('exist');
                cy.checkA11y(null, null, logA11yViolations);
            }
        });

        cy.get('[aria-live="polite"]').then(($notif) => {
            if ($notif.length) {
                cy.checkA11y(null, null, logA11yViolations);
            }
        });
    });

    afterEach(() => {
        cy.task('log', 'Accessibility test completed');
    });
});