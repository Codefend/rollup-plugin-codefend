const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const tsParser = require("@typescript-eslint/parser");
const prettierConfig = require("eslint-config-prettier/flat");

module.exports = [
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  {
    files: ["*.ts"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": 2,
    },
  },
  prettierConfig,
];
