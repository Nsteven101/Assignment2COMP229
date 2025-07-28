module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],    // ← add this line

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },

  moduleNameMapper: {
    '^.+\\.(png|jpe?g|gif|webp|svg)$': '<rootDir>/fileMock.js',
    '^.+\\.(css|scss)$': 'identity-obj-proxy'
  },

  transformIgnorePatterns: ['/node_modules/']
};