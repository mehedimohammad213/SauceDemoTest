/**
 * Environment Variables Loader
 * Loads and validates environment variables from .env file
 */
require("dotenv").config();

/**
 * Get environment variable with optional default value
 * @param {string} key - Environment variable key
 * @param {string|number|boolean} defaultValue - Default value if not set
 * @returns {string|number|boolean} Environment variable value
 */
function getEnv(key, defaultValue = null) {
  const value = process.env[key];
  if (value === undefined || value === null) {
    if (defaultValue !== null) {
      return defaultValue;
    }
    throw new Error(
      `Environment variable ${key} is not set and no default value provided`
    );
  }

  // Convert string booleans to actual booleans
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;

  // Convert string numbers to actual numbers
  if (!isNaN(value) && value.trim() !== "") {
    return Number(value);
  }

  // Handle 'undefined' string
  if (value === "undefined") return undefined;

  return value;
}

/**
 * Get integer from environment variable
 * @param {string} key - Environment variable key
 * @param {number} defaultValue - Default value
 * @returns {number} Integer value
 */
function getEnvInt(key, defaultValue) {
  const value = getEnv(key, defaultValue);
  return parseInt(value, 10);
}

/**
 * Get boolean from environment variable
 * @param {string} key - Environment variable key
 * @param {boolean} defaultValue - Default value
 * @returns {boolean} Boolean value
 */
function getEnvBool(key, defaultValue) {
  const value = getEnv(key, defaultValue);
  return value === true || value === "true" || value === "1";
}

module.exports = {
  getEnv,
  getEnvInt,
  getEnvBool,
};
