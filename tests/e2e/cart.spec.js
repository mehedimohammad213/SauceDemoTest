const { test, expect } = require('../../fixtures/pageFixtures');
const TestData = require('../../data/TestData');

/**
 * E2E Test: Cart Functionality
 *
 * Test Suite: Cart Management
 * Description: Tests for adding products to cart, verifying cart contents, and cart interactions
 */
test.describe('Cart Functionality', () => {

  test.beforeEach(async ({ loginPage, productsPage }) => {
    // Navigate and login before each test
    await loginPage.navigate();
    await loginPage.login(
      TestData.users.standard.username,
      TestData.users.standard.password
    );
    await productsPage.verifyProductsPage();
  });

  test('User should be able to add product to cart and verify product name', async ({
    page,
    productsPage,
    cartPage,
    menuPage,
  }) => {
    // Test: User logs in, adds one product to cart, verifies product name, and logs out

    // Step 1: Get the first product name before adding to cart
    const firstProductName = await productsPage.getProductName(0);
    expect(firstProductName).toBeTruthy();

    // Step 2: Add the first product to cart
    await productsPage.addProductToCart(0);

    // Step 3: Verify cart badge shows 1 item
    await productsPage.verifyCartBadgeCount(1);

    // Step 4: Navigate to cart page
    await productsPage.clickCart();
    await cartPage.verifyCartPage();

    // Step 5: Verify product name in cart matches the added product
    await cartPage.verifyProductName(firstProductName, 0);

    // Step 6: Verify exactly one item is in the cart
    await cartPage.verifyItemCount(1);

    // Step 7: Logout
    await menuPage.logout();

    // Step 8: Verify logout was successful
    await expect(page).toHaveURL(TestData.urls.login);
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('User should see correct cart badge count after adding multiple products', async ({
    productsPage,
    cartPage,
  }) => {
    // Add first product
    await productsPage.addProductToCart(0);
    await productsPage.verifyCartBadgeCount(1);

    // Add second product
    await productsPage.addProductToCart(1);
    await productsPage.verifyCartBadgeCount(2);

    // Verify cart contains 2 items
    await productsPage.clickCart();
    await cartPage.verifyCartPage();
    await cartPage.verifyItemCount(2);
  });

  test('User should be able to remove product from cart', async ({
    productsPage,
    cartPage,
  }) => {
    // Add product to cart
    await productsPage.addProductToCart(0);
    await productsPage.verifyCartBadgeCount(1);

    // Navigate to cart
    await productsPage.clickCart();
    await cartPage.verifyCartPage();

    // Remove product
    await cartPage.removeItem(0);

    // Verify cart is empty
    const isEmpty = await cartPage.isEmpty();
    expect(isEmpty).toBe(true);
  });
});
