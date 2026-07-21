/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^test/(.*)$": "<rootDir>/test/$1",
    "^db/(.*)$": "<rootDir>/db/$1",
  },
};

module.exports = config;
