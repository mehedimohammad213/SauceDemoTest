// @ts-check
const { defineConfig, devices } = require("@playwright/test");
const { getEnv, getEnvInt, getEnvBool } = require("./config/envLoader");

/**
 * Playwright Configuration for Sauce Demo Automation
 *
 * Senior SQA Engineer Level Configuration
 * All settings loaded from .env file
 * Includes comprehensive settings for CI/CD, reporting, and test execution
 */
module.exports = defineConfig({
  // Test directory
  testDir: "./tests/e2e",

  // Test execution settings (from .env)
  fullyParallel: true,
  forbidOnly: getEnvBool("CI", false),
  retries: getEnvBool("CI", false)
    ? getEnvInt("RETRIES_CI", 2)
    : getEnvInt("RETRIES", 0),
  workers: getEnvBool("CI", false)
    ? getEnvInt("WORKERS_CI", 1)
    : getEnv("WORKERS", undefined),
  timeout: getEnvInt("TEST_TIMEOUT", 30000),
  expect: {
    timeout: getEnvInt("EXPECT_TIMEOUT", 10000),
  },

  // Reporters configuration (from .env)
  reporter: (() => {
    const reporters = [];
    if (getEnvBool("ENABLE_HTML_REPORTER", true)) {
      reporters.push(["html", { outputFolder: "playwright-report" }]);
    }
    reporters.push(["list"]);
    if (getEnvBool("ENABLE_JSON_REPORTER", true)) {
      reporters.push(["json", { outputFile: "test-results/results.json" }]);
    }
    if (getEnvBool("ENABLE_JUNIT_REPORTER", true)) {
      reporters.push(["junit", { outputFile: "test-results/junit.xml" }]);
    }
    return reporters;
  })(),

  // Global test settings (from .env)
  use: {
    baseURL: getEnv("BASE_URL", "https://www.saucedemo.com"),
    trace: getEnvBool("TRACE_ON_RETRY", true) ? "on-first-retry" : "off",
    screenshot: getEnvBool("SCREENSHOT_ON_FAILURE", true)
      ? "only-on-failure"
      : "off",
    video: getEnvBool("VIDEO_ON_FAILURE", true) ? "retain-on-failure" : "off",
    actionTimeout: getEnvInt("ACTION_TIMEOUT", 10000),
    navigationTimeout: getEnvInt("NAVIGATION_TIMEOUT", 30000),
    // Viewport settings (from .env)
    viewport: {
      width: getEnvInt("VIEWPORT_WIDTH", 1536),
      height: getEnvInt("VIEWPORT_HEIGHT", 816),
    },
    // Browser context options
    ignoreHTTPSErrors: getEnvBool("IGNORE_HTTPS_ERRORS", true),
    // Additional context options (from .env)
    locale: getEnv("LOCALE", "en-US"),
    timezoneId: getEnv("TIMEZONE", "America/New_York"),
  },

  // Browser projects (from .env)
  projects: [
    {
      name: getEnv("BROWSER", "chromium"),
      use: {
        ...devices["Desktop Chrome"],
        viewport: {
          width: getEnvInt("VIEWPORT_WIDTH", 1536),
          height: getEnvInt("VIEWPORT_HEIGHT", 816),
        },
      },
    },
    // Uncomment to add more browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Web server configuration (if needed for local testing)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
