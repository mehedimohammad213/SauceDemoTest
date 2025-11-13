const { test, expect } = require('../../fixtures/pageFixtures');
const TestData = require('../../data/TestData');

/**
 * Main E2E Test Scenario
 *
 * Test: User login, add to cart, verify product, and logout
 *
 * This test implements the main scenario:
 * - User logs in with valid credentials
 * - Adds one product to the cart
 * - Verifies the product name in the cart
 * - Logs out
 */
test('User login, add to cart, verify product, and logout', async ({
  page,
  loginPage,
  productsPage,
  cartPage,
  menuPage,
}) => {
  // Step 1: Navigate to Sauce Demo website and login
  await loginPage.navigate();
  await loginPage.verifyLoginPage();

  await loginPage.login(
    TestData.users.standard.username,
    TestData.users.standard.password
  );

  // Verify login was successful
  await productsPage.verifyProductsPage();

  // Step 2: Add one product to the cart
  // Get the first product's name before adding to cart
  const firstProductName = await productsPage.getProductName(0);
  expect(firstProductName).toBeTruthy();

  // Add the first product to cart
  await productsPage.addProductToCart(0);

  // Verify that the cart badge shows 1 item
  await productsPage.verifyCartBadgeCount(1);

  // Step 3: Verify the product name in the cart
  // Navigate to cart page
  await productsPage.clickCart();
  await cartPage.verifyCartPage();

  // Verify the product name in the cart matches what we added
  await cartPage.verifyProductName(firstProductName, 0);

  // Additional verification: Check that exactly one item is in the cart
  await cartPage.verifyItemCount(1);

  // Step 4: Log out
  await menuPage.logout();

  // Verify logout was successful by checking if we're back on the login page
  await expect(page).toHaveURL(TestData.urls.login);
  await expect(page.locator('#login-button')).toBeVisible();
});
