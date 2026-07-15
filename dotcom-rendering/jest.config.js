const swcConfig = require('./.swcrc.jest.json');

const esModules = [
	'@guardian/',
	'@csstools',
	'@exodus',
	'@asamuzakjp',
	'@bramus',
	'screenfull',
	'node-fetch',
	'data-uri-to-buffer',
	'fetch-blob',
	'formdata-polyfill',
	'storybook',
	'parse5',
	'entities',
].join('|');

module.exports = {
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	transform: {
		'^.+\\.(mjs|js|ts|tsx)$': ['@swc/jest', swcConfig],
	},
	testMatch: ['**/*.test.+(ts|tsx|js)'],
	setupFilesAfterEnv: ['<rootDir>/scripts/jest/setup.ts'],
	moduleNameMapper: {
		'^svgs/(.*)$': '<rootDir>/__mocks__/svgMock.tsx',
		'^(.*)\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
		'(.*)/islandRegistry': '<rootDir>/__mocks__/islandRegistry.ts',
	},
	transformIgnorePatterns: [`/node_modules/.pnpm/(?!${esModules})`],
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
