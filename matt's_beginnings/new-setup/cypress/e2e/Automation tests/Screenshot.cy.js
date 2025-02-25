// Function to generate a timestamp in the format YYYY-MM-DD_HH-MM-SS
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, "-").slice(0, 19); // Formats as 'YYYY-MM-DD_HH-MM-SS'
}

describe('Screenshot and Video Capture', () => {

    it('should capture screenshots with timestamps', () => {
        // Generate timestamp once and save it to a variable
        const timestamp = getTimestamp();

        // Construct the filename with timestamp for the screenshot
        const homePageScreenshotName = `home_page_${timestamp}`;
        const elementScreenshotName = `MyScreenshot_${timestamp}`;

        // Visit the page
        cy.visit('/');
        
        // Capture a screenshot with the generated filename
        cy.screenshot(homePageScreenshotName);
        
        // Wait and capture a specific element screenshot with the generated filename
        cy.wait(4000);
        cy.get("body > div.standard-section.homepage-hero-section.white > div > div > div.column-2.w-col.w-col-6.w-col-tiny-tiny-stack > h1")
          .screenshot(elementScreenshotName);
    });
});
