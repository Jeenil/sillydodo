// This is the configuration file for Prettier, the auto-formatter:
// https://prettier.io/docs/en/configuration.html

// @ts-check

/** @type {import("prettier").Config} */
const config = {
  overrides: [
    // Allow proper formatting of JSONC files that have JSON file extensions.
    {
      files: ["**/tsconfig.json"],
      options: {
        parser: "jsonc",
      },
    },
  ],

  plugins: [
    "prettier-plugin-organize-imports", // Prettier does not format imports by default.
    "prettier-plugin-packagejson", // Prettier does not format "package.json" by default.
  ],

  // There are no known arguments for placing operators at the end of the line, as outlined in
  // this thread: https://github.com/prettier/prettier/issues/3806
  experimentalOperatorPosition: "start",
};

export default config;
