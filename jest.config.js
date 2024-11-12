

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
      'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@firebase)',
  ],
  testMatch: ['**/__tests__/**/*.test.ts'], // Only run .test.ts files in __tests__ directories
  modulePathIgnorePatterns: ['<rootDir>/__mocks__/'], // Ignore files in __mocks__ directories
};