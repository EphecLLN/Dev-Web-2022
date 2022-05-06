module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  plugins: [
    "jest",
    "react",
  ],
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
    "max-len": [
      "error", {
        code: 80,
        tabWidth: 4,
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: false,
      }
    ],
    "indent": ["error", 2],
    "max-depth": ["error", 6],
    "complexity": ["error", 5],
    "no-unused-vars": [
      "error", {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      }
    ],
    "prefer-arrow-callback": "error",
    "function-paren-newline": ["error", "multiline-arguments"],
    "function-call-argument-newline": ["error", "consistent"],
    "newline-per-chained-call": ["error", {"ignoreChainWithDepth": 3}],
    "object-curly-newline": [
      "error", {
        "ObjectExpression": {
          multiline: true,
          consistent: true,
          minProperties: 4,
        },
        "ObjectPattern": {consistent: true},
        "ImportDeclaration": "never",
        "ExportDeclaration": {
          "multiline": true,
          "minProperties": 3,
        },
      },
    ],
    "array-bracket-newline": ["error", {multiline: true}],
    "react/prop-types": ["error", {skipUndeclared: true}],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      plugins: [
        "jest",
        "react",
        "@typescript-eslint",
      ],
      extends: [
        "eslint:recommended",
        "plugin:jest/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
    }
  ],
}
