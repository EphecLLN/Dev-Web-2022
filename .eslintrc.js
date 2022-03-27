module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "jest",
    "react",
  ],
  settings: {
    jest: {
      version: require("jest/package.json").version,
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "semi": ["error", "never"],
    "quotes": ["error", "double"],
    "prefer-arrow-callback": "error",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
}
