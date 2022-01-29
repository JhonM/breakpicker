module.exports = {
  plugins: ["@typescript-eslint", "prettier", "jsdoc"],
  ignorePatterns: ["dist"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jsdoc/recommended",
    "prettier",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      {
        ignoreParameters: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["src/*/*"],
      rules: {
        "max-lines": "off",
        "max-nested-callbacks": "off",
        "max-statements": "off",
      },
    },
  ],
  settings: {
    node: {
      extensions: [".ts", ".json"],
    },
  },
};
