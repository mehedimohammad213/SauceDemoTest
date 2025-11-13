/**
 * Application Constants
 * Centralized constants used across the test framework
 */

const Constants = {
  // Selectors
  SELECTORS: {
    LOGIN: {
      USERNAME: '#user-name',
      PASSWORD: '#password',
      LOGIN_BUTTON: '#login-button',
      ERROR_MESSAGE: '[data-test="error"]',
    },
    PRODUCTS: {
      TITLE: '.title',
      PRODUCT_ITEM: '.inventory_item',
      PRODUCT_NAME: '.inventory_item_name',
      PRODUCT_PRICE: '.inventory_item_price',
      ADD_TO_CART: '.btn_inventory',
      CART_BADGE: '.shopping_cart_badge',
      CART_LINK: '.shopping_cart_link',
      SORT_DROPDOWN: '.product_sort_container',
    },
    CART: {
      TITLE: '.title',
      CART_ITEM: '.cart_item',
      ITEM_NAME: '.inventory_item_name',
      ITEM_PRICE: '.inventory_item_price',
      CHECKOUT_BUTTON: '#checkout',
      CONTINUE_SHOPPING: '#continue-shopping',
    },
    MENU: {
      MENU_BUTTON: '#react-burger-menu-btn',
      LOGOUT_LINK: '#logout_sidebar_link',
      ALL_ITEMS: '#inventory_sidebar_link',
      ABOUT: '#about_sidebar_link',
      RESET_APP: '#reset_sidebar_link',
    },
  },

  // URLs
  URLS: {
    BASE: 'https://www.saucedemo.com',
    LOGIN: '/',
    INVENTORY: '/inventory.html',
    CART: '/cart.html',
    CHECKOUT_STEP_ONE: '/checkout-step-one.html',
    CHECKOUT_STEP_TWO: '/checkout-step-two.html',
    CHECKOUT_COMPLETE: '/checkout-complete.html',
  },

  // Test Data
  CREDENTIALS: {
    STANDARD_USER: {
      USERNAME: 'standard_user',
      PASSWORD: 'secret_sauce',
    },
  },

  // Timeouts
  TIMEOUTS: {
    ELEMENT_VISIBLE: 5000,
    NAVIGATION: 10000,
    API_CALL: 30000,
  },

  // Test Configuration
  CONFIG: {
    SCREENSHOT_ON_FAILURE: true,
    VIDEO_ON_FAILURE: true,
    TRACE_ON_RETRY: true,
  },
};

module.exports = Constants;
