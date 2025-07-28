module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    // stub out static asset imports
    '\\.(png|jpe?g|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
}