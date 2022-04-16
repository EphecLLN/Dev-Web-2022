/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: [
    "json",
    "lcov",
  ],
  errorOnDeprecated: true,
  globals: {},
  moduleFileExtensions: ["js"],
  notify: false,
  notifyMode: "failure-change",
  slowTestThreshold: 1,
}
