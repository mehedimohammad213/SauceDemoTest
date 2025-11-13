const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

/**
 * Login Page Object Model
 * Handles all interactions with the login page
 */
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.selectors = {
      usernameInput: '#user-name',
      passwordInput: '#password',
      loginButton: '#login-button',
      errorMessage: '[data-test="error"]',
    };
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.goto('/');
    await this.waitForElement(this.selectors.loginButton);
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.fill(this.selectors.usernameInput, username);
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.fill(this.selectors.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.click(this.selectors.loginButton);
  }

  /**
   * Perform login with credentials
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPage() {
    await expect(this.page.locator(this.selectors.loginButton)).toBeVisible();
  }

  /**
   * Verify error message is displayed
   * @param {string} expectedMessage - Expected error message
   */
  async verifyErrorMessage(expectedMessage) {
    const errorText = await this.getText(this.selectors.errorMessage);
    expect(errorText).toContain(expectedMessage);
  }

  /**
   * Check if error message is visible
   * @returns {Promise<boolean>} True if error is visible
   */
  async isErrorMessageVisible() {
    return await this.isVisible(this.selectors.errorMessage);
  }
}

module.exports = LoginPage;
