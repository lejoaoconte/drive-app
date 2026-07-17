/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};

module.exports = config;
