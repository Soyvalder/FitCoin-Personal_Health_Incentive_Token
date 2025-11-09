const path = require("path");

const buildNextEslintCommand = (filenames) => {
  // Procesar 1 archivo a la vez para evitar el error
  return filenames.map((filename) => {
    const relativePath = path.relative(path.join("packages", "nextjs"), filename);
    return `yarn next:lint --fix ${relativePath}`;
  });
};

const checkTypesNextCommand = () => "yarn next:check-types";

const buildStylusEslintCommand = (filenames) => {
  // Procesar 1 archivo a la vez
  return filenames.map((filename) => {
    const relativePath = path.relative(path.join("packages", "stylus"), filename);
    return `yarn stylus:lint --fix ${relativePath}`;
  });
};

module.exports = {
  "packages/nextjs/**/*.{ts,tsx}": [
    buildNextEslintCommand,
    checkTypesNextCommand,
  ],
  "packages/stylus/**/*.{ts,tsx}": [buildStylusEslintCommand],
};