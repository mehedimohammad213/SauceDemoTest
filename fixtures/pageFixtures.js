const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const MenuPage = require('../pages/MenuPage');
const TestData = require('../data/TestData');

/**
 * Custom fixtures extending Playwright's test
 * Provides page objects and test data to all tests
 */
const test = base.test.extend({
  // Page Objects
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  menuPage: async ({ page }, use) => {
    await use(new MenuPage(page));
  },

  // Test Data
  testData: async ({}, use) => {
    await use(TestData);
  },

  // Authenticated page (pre-logged in)
  authenticatedPage: async ({ page, loginPage, productsPage }, use) => {
    await loginPage.navigate();
    await loginPage.login(
      TestData.users.standard.username,
      TestData.users.standard.password
    );
    await productsPage.verifyProductsPage();
    await use(page);
  },
});

// Export test and expect for use in test files
module.exports = {
  test,
  expect: base.expect
};
