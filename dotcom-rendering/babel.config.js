module.exports = {
	plugins: [
		// Be careful when adding plugins here!
		// They can dramatically alter the build size
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-react-jsx',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-nullish-coalescing-operator',
		'@babel/plugin-transform-runtime',
		'@emotion/babel-plugin',
	],
	env: {
		production: {
			plugins: [
				[
					'@emotion',
					{
						sourceMap: false,
					},
				],
			],
		},
		development: {
			plugins: [
				[
					'@emotion',
					{
						sourceMap: true,
						autoLabel: 'dev-only',
					},
				],
			],
		},
	},
	ignore: ['**/*.json'],
	sourceType: 'unambiguous',
};
