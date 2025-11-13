const { test, expect } = require('../../fixtures/pageFixtures');
const TestData = require('../../data/TestData');

/**
 * E2E Test: Login Functionality
 *
 * Test Suite: Authentication
 * Description: Tests for user login, logout, and authentication flows
 */
test.describe('Login Functionality', () => {

  test('User should login successfully with valid credentials', async ({
    loginPage,
    productsPage,
  }) => {
    // Navigate to login page
    await loginPage.navigate();

    // Perform login
    await loginPage.login(
      TestData.users.standard.username,
      TestData.users.standard.password
    );

    // Verify successful login
    await productsPage.verifyProductsPage();
  });

  test('User should see error message with invalid credentials', async ({
    loginPage,
  }) => {
    // Navigate to login page
    await loginPage.navigate();

    // Attempt login with invalid credentials
    await loginPage.login('invalid_user', 'invalid_password');

    // Verify error message is displayed
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
  });

  test('User should logout successfully', async ({
    page,
    loginPage,
    productsPage,
    menuPage,
  }) => {
    // Login first
    await loginPage.navigate();
    await loginPage.login(
      TestData.users.standard.username,
      TestData.users.standard.password
    );
    await productsPage.verifyProductsPage();

    // Perform logout
    await menuPage.logout();

    // Verify logout was successful
    await expect(page).toHaveURL(TestData.urls.login);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
