/**
 * Test Data Management
 * Centralized test data for all test scenarios
 * All values are loaded from .env file
 */

const { getEnv, getEnvInt } = require("../config/envLoader");

// Get base URL from environment
const BASE_URL = getEnv("BASE_URL", "https://www.saucedemo.com");

const TestData = {
  // User Credentials (loaded from .env)
  users: {
    standard: {
      username: getEnv("STANDARD_USER_USERNAME", "standard_user"),
      password: getEnv("STANDARD_USER_PASSWORD", "secret_sauce"),
    },
    lockedOut: {
      username: getEnv("LOCKED_OUT_USER_USERNAME", "locked_out_user"),
      password: getEnv("LOCKED_OUT_USER_PASSWORD", "secret_sauce"),
    },
    problem: {
      username: getEnv("PROBLEM_USER_USERNAME", "problem_user"),
      password: getEnv("PROBLEM_USER_PASSWORD", "secret_sauce"),
    },
    performanceGlitch: {
      username: getEnv(
        "PERFORMANCE_GLITCH_USER_USERNAME",
        "performance_glitch_user"
      ),
      password: getEnv("PERFORMANCE_GLITCH_USER_PASSWORD", "secret_sauce"),
    },
    error: {
      username: getEnv("ERROR_USER_USERNAME", "error_user"),
      password: getEnv("ERROR_USER_PASSWORD", "secret_sauce"),
    },
    visual: {
      username: getEnv("VISUAL_USER_USERNAME", "visual_user"),
      password: getEnv("VISUAL_USER_PASSWORD", "secret_sauce"),
    },
  },

  // URLs (constructed from BASE_URL in .env)
  urls: {
    baseUrl: BASE_URL,
    login: `${BASE_URL}/`,
    inventory: `${BASE_URL}/inventory.html`,
    cart: `${BASE_URL}/cart.html`,
    checkout: `${BASE_URL}/checkout-step-one.html`,
    checkoutComplete: `${BASE_URL}/checkout-complete.html`,
  },

  // Product Names (as they appear on the site)
  products: {
    backpack: "Sauce Labs Backpack",
    bikeLight: "Sauce Labs Bike Light",
    boltTShirt: "Sauce Labs Bolt T-Shirt",
    fleeceJacket: "Sauce Labs Fleece Jacket",
    onesie: "Sauce Labs Onesie",
    testAllThings: "Test.allTheThings() T-Shirt (Red)",
  },

  // Sort Options
  sortOptions: {
    nameAscending: "az",
    nameDescending: "za",
    priceLowToHigh: "lohi",
    priceHighToLow: "hilo",
  },

  // Error Messages
  errorMessages: {
    lockedOut: "Epic sadface: Sorry, this user has been locked out.",
    invalidCredentials:
      "Epic sadface: Username and password do not match any user in this service",
    requiredUsername: "Epic sadface: Username is required",
    requiredPassword: "Epic sadface: Password is required",
  },

  // Checkout Data
  checkout: {
    firstName: "John",
    lastName: "Doe",
    postalCode: "12345",
  },

  // Timeouts (in milliseconds) - loaded from .env
  timeouts: {
    short: 2000,
    medium: 5000,
    long: getEnvInt("ACTION_TIMEOUT", 10000),
    veryLong: getEnvInt("TEST_TIMEOUT", 30000),
  },
};

module.exports = TestData;
