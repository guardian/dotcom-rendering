const testCoveragePaths = [
	'renderer.ts',
	'item.ts',
	'atoms.ts',
	'capi.ts',
	'bodyElement.ts',
	'contributor.ts',
	'date.ts',
	'image.ts',
	'lib.ts',
	'liveBlock.ts',
	'relatedContent.ts',
	'video.ts',
	'client/article.ts',
	'client/editions.ts',
	'client/parser.ts',
	'server/paramParser.ts',
	'server/csp.ts',
	'components/editions/kickerPicker.ts',
].map((path) => `<rootDir>/src/${path}`);

module.exports = {
	collectCoverage: true,
	preset: 'ts-jest/presets/js-with-ts',
	rootDir: '../',
	globals: {
		'ts-jest': {
			babelConfig: {
				presets: [
					[
						'@babel/preset-env',
						{ targets: { node: '12' }, modules: 'cjs' },
					],
					[
						'@babel/preset-react',
						{
							runtime: 'automatic',
							importSource: '@emotion/core',
						},
					],
				],
				plugins: ['@emotion'],
			},
			tsconfig: 'config/tsconfig.test.json',
		},
	},
	coverageThreshold: {
		global: {
			branches: 35,
			functions: 45,
			lines: 45,
			statements: 45,
		},
	},
	coverageReporters: ['text', 'html', 'text-summary'],
	collectCoverageFrom: testCoveragePaths,
	moduleDirectories: ['node_modules', 'src'],
	snapshotSerializers: ['@emotion/jest/serializer'],
	transformIgnorePatterns: ['node_modules/(?!@guardian)'],
	moduleNameMapper: {
		'preact-render-to-string': 'react-dom/server',
	},
};
