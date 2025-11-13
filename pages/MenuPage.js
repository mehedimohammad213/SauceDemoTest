const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

/**
 * Menu/Sidebar Page Object Model
 * Handles all interactions with the hamburger menu sidebar
 */
class MenuPage extends BasePage {
  constructor(page) {
    super(page);
    // Selectors
    this.selectors = {
      menuButton: '#react-burger-menu-btn',
      menuSidebar: '.bm-menu-wrap',
      allItemsLink: '#inventory_sidebar_link',
      aboutLink: '#about_sidebar_link',
      logoutLink: '#logout_sidebar_link',
      resetAppStateLink: '#reset_sidebar_link',
      closeMenuButton: '#react-burger-cross-btn',
    };
  }

  /**
   * Open menu sidebar
   */
  async openMenu() {
    await this.click(this.selectors.menuButton);
    await this.waitForElement(this.selectors.menuSidebar);
  }

  /**
   * Close menu sidebar
   */
  async closeMenu() {
    if (await this.isVisible(this.selectors.closeMenuButton)) {
      await this.click(this.selectors.closeMenuButton);
    }
  }

  /**
   * Click on All Items link
   */
  async clickAllItems() {
    await this.waitForElement(this.selectors.allItemsLink, { state: 'visible' });
    await this.click(this.selectors.allItemsLink);
  }

  /**
   * Click on About link
   */
  async clickAbout() {
    await this.waitForElement(this.selectors.aboutLink, { state: 'visible' });
    await this.click(this.selectors.aboutLink);
  }

  /**
   * Click on Logout link
   */
  async clickLogout() {
    await this.waitForElement(this.selectors.logoutLink, { state: 'visible' });
    await this.click(this.selectors.logoutLink);
  }

  /**
   * Click on Reset App State link
   */
  async clickResetAppState() {
    await this.waitForElement(this.selectors.resetAppStateLink, { state: 'visible' });
    await this.click(this.selectors.resetAppStateLink);
  }

  /**
   * Perform logout action
   */
  async logout() {
    await this.openMenu();
    await this.clickLogout();
  }

  /**
   * Verify menu is open
   */
  async verifyMenuIsOpen() {
    await expect(this.page.locator(this.selectors.menuSidebar)).toBeVisible();
  }

  /**
   * Verify menu is closed
   */
  async verifyMenuIsClosed() {
    await expect(this.page.locator(this.selectors.menuSidebar)).not.toBeVisible();
  }
}

module.exports = MenuPage;
