const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const swcConfig = require('./.swcrc.json');
const { getBrowserTargets } = require('./browser-targets');

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

/** @typedef {import('../../src/lib/assets').Build} Build*/

/**
 * @param {Build} build
 * @returns {string}
 */
const generateName = (build) => {
	const chunkhashString = DEV ? '' : '.[chunkhash]';
	return `[name].${build}${chunkhashString}.js`;
};

/**
 * @param {Build} build
 * @returns {string}
 */
const getLoaders = (build) => {
	switch (build) {
		case 'web.legacy':
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
		case 'web.variant':
		case 'web.scheduled':
		case 'web.ophan-esm':
		case 'web':
			return swcLoader(getBrowserTargets());
	}
};

/**
 * @param {{ build: Build, sessionId: string }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ build, sessionId }) => ({
	entry: {
		index: './src/client/index.ts',
		debug: './src/client/debug/index.ts',
	},
	resolve: {
		alias: {
			'ophan-tracker-js':
				build === 'web.ophan-esm'
					? 'ophan-tracker-js-esm'
					: 'ophan-tracker-js',
		},
	},
	optimization:
		// We don't need chunk optimization for apps as we use the 'LimitChunkCountPlugin' to produce just 1 chunk
		build === 'apps'
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
			return generateName(build);
		},
		chunkFilename: generateName(build),
		publicPath: '',
	},
	plugins: [
		new WebpackManifestPlugin({
			fileName: `manifest.${build}.json`,
		}),
		...(build === 'apps'
			? [
					new webpack.optimize.LimitChunkCountPlugin({
						maxChunks: 1,
					}),
					new webpack.ProvidePlugin({
						Buffer: ['buffer', 'Buffer'],
					}),
			  ]
			: []),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: module.exports.babelExclude,
				use: getLoaders(build),
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
