# Sauce Demo Automation Framework

[![Playwright Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml)

Playwright-based test automation framework using Page Object Model (POM) architecture for Sauce Demo e-commerce testing.

> **Note:** Replace `YOUR_USERNAME` and `YOUR_REPO` in the badge URL with your actual GitHub username and repository name.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Page Object Model](#page-object-model)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

Test automation framework built with Playwright and JavaScript, implementing the Page Object Model design pattern for maintainability and scalability.

### Features

- ✅ Page Object Model (POM) architecture
- ✅ Custom fixtures for reusable page objects
- ✅ Environment-based configuration (.env)
- ✅ Centralized test data management
- ✅ HTML, JSON, and JUnit reporting
- ✅ CI/CD ready
- ✅ Multi-browser support (Chromium, Firefox, WebKit)

## Prerequisites

- Node.js 16.0.0 or higher
- npm 8.0.0 or higher

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mehedimohammad213/SauceDemoTest.git
   cd SauceDemoTest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration. See [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) for details.

4. **Install Playwright browsers**

   ```bash
   npx playwright install chromium
   ```

## Project Structure

```
testExam/
├── pages/              # Page Object Model classes
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── MenuPage.js
├── tests/e2e/         # Test files
│   ├── main-scenario.spec.js
│   ├── cart.spec.js
│   └── login.spec.js
├── utils/             # Utility functions
├── data/              # Test data
├── config/            # Configuration files
├── fixtures/          # Custom Playwright fixtures
├── playwright.config.js
└── package.json
```

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run in headed mode
npm run test:headed

# Run in UI mode (interactive)
npm run test:ui

# Run specific test suite
npm run test:main    # Main scenario
npm run test:cart    # Cart tests
npm run test:login   # Login tests

# Debug mode
npm run test:debug

# View test report
npm run test:report
```

## Configuration

### Environment Variables

All configuration is managed through `.env` file:

- **URLs**: `BASE_URL`
- **Credentials**: User credentials (e.g., `STANDARD_USER_USERNAME`, `STANDARD_USER_PASSWORD`)
- **Test Settings**: Timeouts, retries, workers
- **Browser Settings**: Viewport, locale, timezone
- **Reporting**: Enable/disable reporters

See [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) for complete documentation.

### Test Data

Test data is centralized in `data/TestData.js` and loaded from `.env`:

```javascript
const TestData = require("./data/TestData");

await loginPage.login(
  TestData.users.standard.username,
  TestData.users.standard.password
);
```

## Page Object Model

### BasePage

All page objects extend `BasePage` with common methods:

- `goto(url)` - Navigate to URL
- `click(selector)` - Click element
- `fill(selector, value)` - Fill input field
- `getText(selector)` - Get text content
- `isVisible(selector)` - Check visibility

### Usage Examples

**LoginPage**

```javascript
const loginPage = new LoginPage(page);
await loginPage.navigate();
await loginPage.login("username", "password");
```

**ProductsPage**

```javascript
const productsPage = new ProductsPage(page);
await productsPage.addProductToCart(0);
await productsPage.verifyCartBadgeCount(1);
```

**CartPage**

```javascript
const cartPage = new CartPage(page);
await cartPage.verifyProductName("Product Name", 0);
await cartPage.verifyItemCount(1);
```

**MenuPage**

```javascript
const menuPage = new MenuPage(page);
await menuPage.logout();
```

## CI/CD Integration

This project includes comprehensive GitHub Actions workflows for continuous integration and deployment.

### Available Workflows

#### 1. **Main Playwright Tests** (`.github/workflows/playwright.yml`)

- **Triggers:** Push to `main`, `develop`, `master` branches and pull requests
- **Features:**
  - Runs tests on multiple Node.js versions (18.x, 20.x)
  - Parallel test execution
  - Automatic test result reporting
  - Artifact uploads (reports, screenshots, videos)
  - JUnit XML reports for test result visualization
  - Code linting

#### 2. **PR Tests** (`.github/workflows/pr-tests.yml`)

- **Triggers:** Pull requests to `main`, `develop`, `master` branches
- **Features:**
  - Fast test execution optimized for PRs
  - Automatic PR comments with test results
  - Test artifact uploads

#### 3. **Nightly Tests** (`.github/workflows/nightly-tests.yml`)

- **Triggers:** Scheduled daily at 2 AM UTC, manual dispatch
- **Features:**
  - Comprehensive nightly test runs
  - Automatic issue creation on failure
  - Long-term test result tracking

### Workflow Features

✅ **Multi-Node.js Version Testing** - Ensures compatibility across Node.js versions
✅ **Automatic Artifact Upload** - Test reports, screenshots, and videos are preserved
✅ **Test Result Reporting** - JUnit XML reports integrated with GitHub Actions
✅ **PR Comments** - Automatic test result summaries in pull requests
✅ **Failure Notifications** - Issues created automatically on nightly test failures
✅ **Parallel Execution** - Optimized worker configuration for CI environments
✅ **Retry Logic** - Automatic retries on flaky tests (configurable)

### CI Environment Variables

The workflows use the following environment variables (with defaults):

- `CI=true` - Enables CI-specific configurations
- `RETRIES_CI=2` - Number of retries for failed tests in CI
- `WORKERS_CI=1` - Number of parallel workers in CI
- `BASE_URL` - Can be set via GitHub Secrets if needed

### Viewing Test Results

1. **GitHub Actions Tab** - Navigate to the "Actions" tab in your repository
2. **Workflow Runs** - Click on any workflow run to see detailed logs
3. **Artifacts** - Download test reports and screenshots from the workflow run
4. **PR Comments** - Check pull request comments for test result summaries

### Setting Up Secrets (Optional)

If you need to override the default `BASE_URL`, add it as a GitHub Secret:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add a new secret named `BASE_URL`
3. Set the value to your target URL

## Troubleshooting

### Common Issues

**Tests fail with timeout**

- Increase timeout in `playwright.config.js`
- Check network connectivity
- Verify selectors are correct

**Browser not found**

```bash
npx playwright install chromium
```

**Dependency issues**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Debug mode**

```bash
npm run test:debug
```

### Test Reports

View HTML reports after test execution:

```bash
npm run test:report
```

Reports include execution timeline, screenshots on failure, video recordings, and trace files.

## Best Practices

- Use Page Objects for all page interactions
- Leverage custom fixtures for page objects
- Centralize test data in `TestData.js`
- Keep selectors in page objects
- Use descriptive assertions and method names

## License

ISC
