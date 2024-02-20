module.exports = {
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '.next', '.storybook'],
  verbose: true,
  coverageThreshold: {
    global: {
      lines: 100,
      statements: 100,
      branches: 92,
      functions: 100,
    },
  },
};
