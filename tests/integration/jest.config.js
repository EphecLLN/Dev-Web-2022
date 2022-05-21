/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Stop running tests after `n` failures
  bail: 10,
  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,
  collectCoverage: false,
  globals: {},
  moduleFileExtensions: ["js"],
  notify: true,
  notifyMode: "failure-change",
  slowTestThreshold: 10,
  verbose: true,
}
