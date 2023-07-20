/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/"],
  testMatch: ["**/*.test.ts?(x)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!**/__mocks__/**",
    "!**/node_modules/**",
    "!**/*.d.ts",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss|less|ts)$": "<rootDir>/__mocks__/styleMock.js",

    // Handle static assets
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg|ttf|woff|woff2)$": `<rootDir>/__mocks__/fileMock.js`,

    // Handle TypeScript path aliases
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  verbose: true,
  testTimeout: 30000,
};
