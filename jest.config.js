/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/**/*.spec.ts"],
  transform: {
    "\\.css\\.ts$": "@vanilla-extract/jest-transform",
  },
};
