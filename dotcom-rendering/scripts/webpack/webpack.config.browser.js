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
const generateName = (bundle) => {
	const chunkhashString = DEV ? '' : '.[chunkhash]';
	return `[name].${bundle}${chunkhashString}.js`;
};

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
		index: './src/web/browser/index.ts',
		debug: './src/web/browser/debug/index.ts',
	},
	optimization:
		// We don't need chunk optimization for apps as we use the 'LimitChunkCountPlugin' to produce just 1 chunk
		bundle === 'apps'
			? undefined
			: {
					splitChunks: {
						cacheGroups: {
							// our own chunk, which is shared between all bundles
							frameworks: {
								test: /[\\/]node_modules[\\/](preact|react-is|hoist-non-react-statistics|swr|@emotion|stylis)[\\/]/,
								chunks: 'all',
								name: 'frameworks',
								enforce: true,
							},
							// defining our own chunk above overrides the webpack defaults,
							// so now we restore them
							// https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
							defaultVendors: {
								test: /[\\/]node_modules[\\/]/,
								priority: -10,
								reuseExistingChunk: true,
							},
							default: {
								minChunks: 2,
								priority: -20,
								reuseExistingChunk: true,
							},
						},
					},
			  },
	output: {
		filename: (data) => {
			// We don't want to hash the debug script so it can be used in bookmarklets
			if (data.chunk.name === 'debug') return `[name].js`;
			return generateName(bundle);
		},
		chunkFilename: generateName(bundle),
		publicPath: '',
	},
	plugins: [
		new WebpackManifestPlugin({
			fileName: `manifest.${bundle}.json`,
		}),
		...(bundle === 'apps'
			? [
					new webpack.optimize.LimitChunkCountPlugin({
						maxChunks: 1,
					}),
					new webpack.ProvidePlugin({
						Buffer: ['buffer', 'Buffer'],
					}),
			  ]
			: []),
		...(DEV
			? [
					new GuStatsReportPlugin({
						buildName: `${bundle}-client`,
						project: 'dotcom-rendering',
						team: 'dotcom',
						sessionId,
					}),
			  ]
			: []),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: module.exports.babelExclude,
				use: getLoaders(bundle),
			},
			{
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				use: ['desvg-loader/react', 'svg-loader'],
			},
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
