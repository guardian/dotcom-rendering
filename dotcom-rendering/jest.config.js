const swcConfig = require('./webpack/.swcrc.json');

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
	'htmlparser2',
	'domhandler',
	'domelementtype',
	'domutils',
	'dom-serializer',
].join('|');

module.exports = {
	projects: [
		{
			displayName: 'unit-tests',
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
				'@eslint/eslintrc/universal':
					'@eslint/eslintrc/dist/eslintrc-universal.cjs',
			},
			transformIgnorePatterns: [`/node_modules/.pnpm/(?!${esModules})`],
			collectCoverageFrom: ['src/**/*.{ts,tsx}'],
		},
		{
			// your jest-runner-eslint options
			runner: 'jest-runner-eslint',
			displayName: 'eslint-rules',
			testMatch: ['<rootDir>/scripts/eslint-rules/*.test.mjs'],
		},
	],
};
