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
			branches: 75,
			functions: 75,
			lines: 75,
			statements: 75,
		},
	},
	coverageReporters: ['text', 'html', 'text-summary'],
	collectCoverageFrom: ['<rootDir>/src/renderer.ts', '<rootDir>/src/item.ts'],
	moduleDirectories: ['node_modules', 'src'],
	snapshotSerializers: ['@emotion/jest/serializer'],
	transformIgnorePatterns: ['node_modules/(?!@guardian)'],
};
