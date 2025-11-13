/**
 * Base Page Object Model
 * Contains common methods and properties shared across all page objects
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector or locator
   * @param {object} options - Wait options
   */
  async waitForElement(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible', ...options });
  }

  /**
   * Click on an element
   * @param {string} selector - CSS selector or locator
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - CSS selector or locator
   * @param {string} value - Value to fill
   */
  async fill(selector, value) {
    await this.page.fill(selector, value);
  }

  /**
   * Get text content of an element
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<string>} Text content
   */
  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector or locator
   * @returns {Promise<boolean>} True if visible
   */
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Get current URL
   * @returns {string} Current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = BasePage;
