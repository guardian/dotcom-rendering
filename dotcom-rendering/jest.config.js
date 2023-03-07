const swcConfig = require('./scripts/webpack/.swcrc.json');

module.exports = {
	"testEnvironment": "jest-environment-jsdom-sixteen",
	"moduleFileExtensions": [
		"ts",
		"tsx",
		"js"
	],
	"transform": {
		"^.+\\.(ts|tsx)$": ["@swc/jest", swcConfig]
	},
	"globals": {
		"ts-jest": {
			"diagnostics": false,
			"tsConfig": "tsconfig.test.json"
		}
	},
	"testMatch": [
		"**/*.test.+(ts|tsx|js)"
	],
	"setupFilesAfterEnv": [
		"<rootDir>/scripts/jest/setup.ts"
	],
	"moduleNameMapper": {
		"^svgs/(.*)$": "<rootDir>/__mocks__/svgMock.tsx",
		"^(.*)\\.svg$": "<rootDir>/__mocks__/svgMock.tsx"
	},
	"testResultsProcessor": "jest-teamcity-reporter",
	"transformIgnorePatterns": [
		"/node_modules/(?!@guardian/)"
	],
	"collectCoverageFrom": [
		"src/**/*.{ts,tsx}"
	]
}
