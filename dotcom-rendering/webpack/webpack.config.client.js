const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const swcConfig = require('./.swcrc.json');
const { getBrowserTargets } = require('./browser-targets');
const { svgr } = require('./svg.cjs');

const DEV = process.env.NODE_ENV === 'development';

/** @param {Record<string, string> | string[]} targets */
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

/** @typedef {import('../src/lib/assets').Build} Build*/

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
const getEntryIndex = (build) => {
	switch (build) {
		case 'client.apps':
			return './src/client/main.apps.ts';
		default:
			return './src/client/main.web.ts';
	}
};

/**
 * @param {Build} build
 * @returns {{ loader: string, options: Record<string, unknown>}}
 */
const getLoaders = (build) => {
	switch (build) {
		case 'client.web.legacy':
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
		case 'client.apps':
			return swcLoader(['android >= 5', 'ios >= 12']);
		case 'client.web.variant':
		case 'client.web.ophan-next':
		case 'client.web':
			return swcLoader(getBrowserTargets());
	}
};

/**
 * @param {{ build: Build }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ build }) => ({
	entry: {
		index: getEntryIndex(build),
		debug: './src/client/debug/debug.ts',
	},
	resolve: {
		alias: {
			'@guardian/ophan-tracker-js':
				build === 'client.web.ophan-next'
					? '@guardian/ophan-tracker-js-next'
					: '@guardian/ophan-tracker-js',
		},
	},
	optimization:
		// We don't need chunk optimization for apps as we use the 'LimitChunkCountPlugin' to produce just 1 chunk
		build === 'client.apps'
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
		...(build === 'client.apps'
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
	externals: getExternalModules(build),
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
			svgr,
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

/**
 * We are making "@guardian/ophan-tracker-js" external to the apps bundle
 * because we never expect to use it in apps pages.
 *
 * Tracking is done natively.
 *
 * @param {Build} build */
const getExternalModules = (build) =>
	build === 'client.apps'
		? { '@guardian/ophan-tracker-js': 'guardian.ophan' }
		: undefined;
