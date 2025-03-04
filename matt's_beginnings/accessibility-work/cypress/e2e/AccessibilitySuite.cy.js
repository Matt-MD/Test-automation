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
        cy.document().then((doc) => {
            if (doc.querySelector(section)) {
                cy.get(section, { timeout: 4000 })
                    .should('be.visible')
                    .then(($el) => cy.checkA11y($el, null, logA11yViolations));
            } else if (section === 'footer') {
                cy.log('Footer not found, checking the last visible element.');
                cy.get('body *:visible').last().then(($lastElement) => {
                    if ($lastElement.length > 0) {
                        cy.wrap($lastElement).should('be.visible').then(() =>
                            cy.checkA11y($lastElement, null, logA11yViolations)
                        );
                    } else {
                        cy.log('No visible elements found, skipping accessibility check.');
                    }
                });
            } else {
                cy.log(`${section} not found, skipping accessibility check.`);
            }
        });
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
    // Get the first visible interactive element and focus on it
    cy.get('a, button, input, select, textarea')
        .filter(':visible')
        .first()
        .should('exist')
        .focus();

    // Simulate pressing the Tab key
    cy.realPress('Tab');

    // Ensure the next focused element is interactive
    cy.focused().should('match', 'a, button, input, select, textarea');
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
                        expect($el.attr('aria-label') || $el.attr('id')).to.not.be.undefined;
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
                cy.visit('/');
                cy.injectAxe();
                cy.checkA11y(null, null, logA11yViolations);
            });
        });
    });

  // Test for dynamic content
  it('Should maintain accessibility after dynamic content updates', () => {
    // Open the modal
    cy.get('[data-test="open-modal"]', { timeout: 10000 })
        .should('be.visible')
        .click();

    // Verify the modal appears
    cy.get('[role="dialog"]').should('exist');
    
    // Run initial accessibility check
    cy.checkA11y(null, null, logA11yViolations);

    // Wait for dynamic notifications and check accessibility
    cy.get('[aria-live="polite"]', { timeout: 10000 })
        .should('exist')
        .within(() => {
            cy.get('*').should('have.length.at.least', 1); // Ensures content exists
        });

    // Run accessibility check again after dynamic content loads
    cy.checkA11y(null, null, logA11yViolations);
});


    afterEach(() => {
        cy.task('log', 'Accessibility test completed');
    });
});
