const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

/**
 * Products Page Object Model
 * Handles all interactions with the products/inventory page
 */
class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.selectors = {
      pageTitle: '.title',
      productItem: '.inventory_item',
      productName: '.inventory_item_name',
      productPrice: '.inventory_item_price',
      addToCartButton: '.btn_inventory',
      removeFromCartButton: '.btn_inventory',
      cartBadge: '.shopping_cart_badge',
      cartLink: '.shopping_cart_link',
      sortDropdown: '.product_sort_container',
      menuButton: '#react-burger-menu-btn',
    };
  }

  /**
   * Verify products page is loaded
   */
  async verifyProductsPage() {
    await expect(this.page).toHaveURL(/.*\/inventory.html/);
    await expect(this.page.locator(this.selectors.pageTitle)).toContainText('Products');
  }

  /**
   * Get product name by index
   * @param {number} index - Product index (0-based)
   * @returns {Promise<string>} Product name
   */
  async getProductName(index = 0) {
    const productNames = this.page.locator(this.selectors.productName);
    return await productNames.nth(index).textContent();
  }

  /**
   * Get product price by index
   * @param {number} index - Product index (0-based)
   * @returns {Promise<string>} Product price
   */
  async getProductPrice(index = 0) {
    const productPrices = this.page.locator(this.selectors.productPrice);
    return await productPrices.nth(index).textContent();
  }

  /**
   * Add product to cart by index
   * @param {number} index - Product index (0-based)
   */
  async addProductToCart(index = 0) {
    const addToCartButtons = this.page.locator(this.selectors.addToCartButton);
    await addToCartButtons.nth(index).click();
  }

  /**
   * Remove product from cart by index
   * @param {number} index - Product index (0-based)
   */
  async removeProductFromCart(index = 0) {
    const removeButtons = this.page.locator(this.selectors.removeFromCartButton);
    await removeButtons.nth(index).click();
  }

  /**
   * Get cart item count from badge
   * @returns {Promise<number>} Number of items in cart
   */
  async getCartItemCount() {
    const badge = this.page.locator(this.selectors.cartBadge);
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return parseInt(text, 10);
    }
    return 0;
  }

  /**
   * Verify cart badge shows specific count
   * @param {number} expectedCount - Expected item count
   */
  async verifyCartBadgeCount(expectedCount) {
    await expect(this.page.locator(this.selectors.cartBadge)).toContainText(expectedCount.toString());
  }

  /**
   * Click on cart icon
   */
  async clickCart() {
    await this.click(this.selectors.cartLink);
  }

  /**
   * Sort products by option
   * @param {string} sortOption - Sort option (az, za, lohi, hilo)
   */
  async sortProducts(sortOption) {
    await this.page.selectOption(this.selectors.sortDropdown, sortOption);
  }

  /**
   * Open menu
   */
  async openMenu() {
    await this.click(this.selectors.menuButton);
  }

  /**
   * Get total number of products
   * @returns {Promise<number>} Total product count
   */
  async getProductCount() {
    return await this.page.locator(this.selectors.productItem).count();
  }
}

module.exports = ProductsPage;
