const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

const jestConfig = {
  rootDir: rootDir,
  testPathIgnorePatterns: [
    '/dist/',
    'tsconfig.json',
  ],
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './coverage',
      outputName: 'junit.xml',
    }],
  ],
  maxWorkers: 1,
  coverageThreshold: {
    global: {
      lines: 70,
      statements: 70,
      branches: 70,
      functions: 60,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
    customExportConditions: [''],
  },
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.setup.ts',
  ],
  setupFiles: [
    path.resolve(rootDir, 'config', 'jest.polyfills.js'),
  ],
};

module.exports = jestConfig;
