'use strict';
// "schema": "https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/prettierrc.json",
// "$schema": "http://json.schemastore.org/prettierrc",
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 120,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  quoteProps: 'as-needed',
  semi: true,
  overrides: [
    {
      files: '*.md',
      options: {
        parser: 'markdown',
        printWidth: 72,
        proseWrap: "always",
        tabWidth: 4,
        useTabs: true,
        singleQuote: false,
        bracketSpacing: true,
      },
    },
  ],
};