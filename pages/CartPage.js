const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

/**
 * Cart Page Object Model
 * Handles all interactions with the shopping cart page
 */
class CartPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.selectors = {
      pageTitle: '.title',
      cartItem: '.cart_item',
      cartItemName: '.inventory_item_name',
      cartItemPrice: '.inventory_item_price',
      cartItemQuantity: '.cart_quantity',
      removeButton: '.cart_button',
      continueShoppingButton: '#continue-shopping',
      checkoutButton: '#checkout',
    };
  }

  /**
   * Verify cart page is loaded
   */
  async verifyCartPage() {
    await expect(this.page).toHaveURL(/.*\/cart.html/);
    await expect(this.page.locator(this.selectors.pageTitle)).toContainText('Your Cart');
  }

  /**
   * Get product name by index
   * @param {number} index - Item index (0-based)
   * @returns {Promise<string>} Product name
   */
  async getProductName(index = 0) {
    const productNames = this.page.locator(this.selectors.cartItemName);
    return await productNames.nth(index).textContent();
  }

  /**
   * Get product price by index
   * @param {number} index - Item index (0-based)
   * @returns {Promise<string>} Product price
   */
  async getProductPrice(index = 0) {
    const productPrices = this.page.locator(this.selectors.cartItemPrice);
    return await productPrices.nth(index).textContent();
  }

  /**
   * Get product quantity by index
   * @param {number} index - Item index (0-based)
   * @returns {Promise<string>} Product quantity
   */
  async getProductQuantity(index = 0) {
    const quantities = this.page.locator(this.selectors.cartItemQuantity);
    return await quantities.nth(index).textContent();
  }

  /**
   * Remove item from cart by index
   * @param {number} index - Item index (0-based)
   */
  async removeItem(index = 0) {
    const removeButtons = this.page.locator(this.selectors.removeButton);
    await removeButtons.nth(index).click();
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping() {
    await this.click(this.selectors.continueShoppingButton);
  }

  /**
   * Click checkout button
   */
  async clickCheckout() {
    await this.click(this.selectors.checkoutButton);
  }

  /**
   * Get total number of items in cart
   * @returns {Promise<number>} Total item count
   */
  async getItemCount() {
    return await this.page.locator(this.selectors.cartItem).count();
  }

  /**
   * Verify cart contains specific number of items
   * @param {number} expectedCount - Expected item count
   */
  async verifyItemCount(expectedCount) {
    const count = await this.getItemCount();
    expect(count).toBe(expectedCount);
  }

  /**
   * Verify product name in cart
   * @param {string} expectedName - Expected product name
   * @param {number} index - Item index (0-based)
   */
  async verifyProductName(expectedName, index = 0) {
    const productName = await this.getProductName(index);
    expect(productName).toBe(expectedName);
  }

  /**
   * Check if cart is empty
   * @returns {Promise<boolean>} True if cart is empty
   */
  async isEmpty() {
    const count = await this.getItemCount();
    return count === 0;
  }
}

module.exports = CartPage;
