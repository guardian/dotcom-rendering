const swcConfig = require('./scripts/webpack/.swcrc.json');

/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	moduleFileExtensions: [
		'js',
		'mjs',
		'cts',
		'cjs',
		'jsx',
		'ts',
		'tsx',
		'json',
		'node',
	],
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	transform: {
		'^.+\\.(cts|ts|tsx)$': ['@swc/jest', swcConfig],
	},
	testMatch: ['**/*.test.+(cts|ts|tsx|js)'],
	setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.ts'],
	moduleNameMapper: {
		'^svgs/(.*)$': '<rootDir>/__mocks__/svgMock.tsx',
		'^(.*)\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
	},
	testResultsProcessor: 'jest-teamcity-reporter',
	transformIgnorePatterns: ['/node_modules/(?!@guardian/)'],
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
