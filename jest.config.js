module.exports = {
  preset: 'ts-jest',
  testEnvironment: "allure-jest/node",
  testRunner: 'jest-circus/runner', 
  testMatch: ['**/src/tests/**/*.test.ts'],
  reporters: [
    'default',
    ['jest-allure', { outputDirectory: 'allure-results' }]
  ],
  maxWorkers: '50%' // Параллельный режим
};
