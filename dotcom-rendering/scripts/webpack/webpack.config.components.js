const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const swcConfig = require('./.swcrc.json');
const { getBrowserTargets } = require('./browser-targets');
const GuStatsReportPlugin = require('./plugins/gu-stats-report-plugin');

const DEV = process.env.NODE_ENV === 'development';

const swcLoader = (targets) => [
	{
		loader: 'swc-loader',
		options: {
			...swcConfig,
			env: {
				dynamicImport: true,
				targets,
			},
		},
	},
];

/**
 * @param {'legacy' | 'modern' | 'variant' | 'apps'} bundle
 * @returns {string}
 */
const getLoaders = (bundle) => {
	switch (bundle) {
		case 'legacy':
			return [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
							[
								'@babel/preset-env',
								{
									targets: {
										ie: '11',
									},
									modules: false,
								},
							],
						],
						compact: true,
					},
				},
				{
					loader: 'ts-loader',
					options: {
						configFile: 'tsconfig.build.json',
						transpileOnly: true,
					},
				},
			];
		case 'apps':
			return swcLoader(['android >= 5', 'ios >= 12']);
		case 'variant':
		case 'modern':
			return swcLoader(getBrowserTargets());
	}
};

/**
 * @param {{ bundle: 'legacy' | 'modern'  | 'variant' | 'apps', sessionId: string }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ bundle, sessionId }) => ({
	entry: {
		// index: './src/web/components/marketing/index.ts',
		ContributionsEpic:
			'./src/web/components/marketing/ContributionsEpic.tsx',
	},
	optimization: {
		runtimeChunk: true,
	},
	experiments: {
		// Necessary for `libraryTarget: 'module'`
		outputModule: true,
	},
	output: {
		filename: (data) => {
			return `marketing/[name].js`;
		},
		publicPath: '',
		library: {
			type: 'module',
		},
		// module: true
	},
	plugins: [
		// new WebpackManifestPlugin({
		// 	fileName: `manifest.${bundle}.json`,
		// }),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: module.exports.babelExclude,
				use: getLoaders(bundle),
			},
			// {
			// 	test: /\.css$/,
			// 	use: ['to-string-loader', 'css-loader'],
			// },
			// {
			// 	test: /\.svg$/,
			// 	use: ['desvg-loader/react', 'svg-loader'],
			// },
		],
	},
});

module.exports.babelExclude = {
	and: [/node_modules/],
	not: [
		// Include all @guardian modules, except automat-modules
		/@guardian\/(?!(automat-modules))/,
		// Include the dynamic-import-polyfill
		/dynamic-import-polyfill/,
	],
};

module.exports.getLoaders = getLoaders;
