module.exports = {
  setupFilesAfterEnv: ['jest-plugin-context/setup', './jest.setup'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
