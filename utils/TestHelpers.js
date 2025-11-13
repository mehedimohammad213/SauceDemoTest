/**
 * Test Helper Utilities
 * Contains reusable helper functions for tests
 */
class TestHelpers {
  /**
   * Wait for a specific amount of time
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise<void>}
   */
  static async wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generate random string
   * @param {number} length - Length of string
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   * @returns {string} Random email
   */
  static generateRandomEmail() {
    return `test_${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Take screenshot with timestamp
   * @param {object} page - Playwright page object
   * @param {string} name - Screenshot name
   * @returns {Promise<void>}
   */
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `test-results/screenshots/${name}_${timestamp}.png` });
  }

  /**
   * Format date to readable string
   * @param {Date} date - Date object
   * @returns {string} Formatted date string
   */
  static formatDate(date = new Date()) {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  /**
   * Extract number from string
   * @param {string} text - Text containing number
   * @returns {number} Extracted number
   */
  static extractNumber(text) {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  /**
   * Remove currency symbols and parse price
   * @param {string} priceText - Price text with currency
   * @returns {number} Parsed price
   */
  static parsePrice(priceText) {
    return parseFloat(priceText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = TestHelpers;
