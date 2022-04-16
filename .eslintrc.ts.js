const baseConfig = require("./.eslintrc.js")

baseConfig.plugins.push("@typescript-eslint")
baseConfig.extends.push("plugin:@typescript-eslint/recommended")
baseConfig.extends.push(
  "plugin:@typescript-eslint/recommended-requiring-type-checking"
)

module.exports = Object.assign(baseConfig, {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: Object.assign(baseConfig.parserOptions, {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  }),
})

