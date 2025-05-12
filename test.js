const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('chromedriver');

async function runTest() {
    // Initialize WebDriver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the local HTML file
        await driver.get('file:///' + __dirname + '/index.html');

        // Wait for 10 seconds
        await driver.sleep(10000);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

runTest();