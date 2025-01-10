// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'node', // or 'jsdom' if your tests are for browser-like environments
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
//   testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{ts,tsx}',
//     '!src/**/*.d.ts',
//     '!src/**/index.ts', // Exclude index files if necessary
//   ],
//   coverageDirectory: 'coverage',
//   coverageReporters: ['json', 'lcov', 'text', 'clover'],
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1', // Adjust if you have alias paths
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add this if you have a setup file
// };

// export default config;


export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Optional: if you're using path aliases
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};