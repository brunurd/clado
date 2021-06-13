module.exports = {
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '.next', '.storybook'],
};
