// @ts-check
const path = require('node:path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const WebpackMessages = require('webpack-messages');
const { BUILD_VARIANT: BUILD_VARIANT_SWITCH } = require('./bundles');

const dist = path.resolve(__dirname, '..', 'dist');
const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

const BUILD_VARIANT = process.env.BUILD_VARIANT === 'true';

/** @typedef {import('../src/lib/assets').Build} Build */

/**
 * @param {{ platform: 'server' | Build}} options
 * @returns {import('webpack').Configuration}
 */
const commonConfigs = ({ platform }) => ({
	name: platform,
	mode: DEV ? 'development' : 'production',
	output: {
		path: dist,
	},
	stats: DEV ? 'errors-only' : 'normal',
	devtool:
		process.env.NODE_ENV === 'production'
			? 'source-map'
			: 'eval-cheap-module-source-map',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
	},
	ignoreWarnings: [
		/**
		 * Express uses dynamic imports to load template engines. As we're not currently using a template engine in DCR
		 * we can ignore this error.
		 */
		{
			module: /..\/node_modules\/express\/lib\/view.js/,
			message:
				/Critical dependency: the request of a dependency is an expression/,
		},
		/**
		 * Log4js uses dynamic imports to load non-core appenders. We're only using 'console' and 'file' appenders in DCR
		 * which are specifically imported by log4js without using dynamic imports.
		 */
		{
			module: /..\/node_modules\/log4js\/lib\/appenders\/index.js/,
			message:
				/Critical dependency: the request of a dependency is an expression/,
		},
	],
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
		}),
		// Matching modules specified in this regex will not be imported during the webpack build
		// We use this if there are optional dependencies (e.g in jsdom, ws) to remove uneccesary warnings in our builds / console outpouts.
		new webpack.IgnorePlugin({
			resourceRegExp: /^(canvas|bufferutil|utf-8-validate)$/,
		}),
		...(DEV
			? // DEV plugins
			  [
					// @ts-expect-error -- somehow the type declaration isn’t playing nice
					new WebpackMessages({
						name: platform,
					}),
			  ]
			: // PROD plugins
			  [
					new BundleAnalyzerPlugin({
						reportFilename: path.join(
							dist,
							'stats',
							`${platform}-bundles.html`,
						),
						analyzerMode: 'static',
						openAnalyzer: false,
						logLevel: 'warn',
					}),
					new BundleAnalyzerPlugin({
						reportFilename: path.join(
							dist,
							'stats',
							`${platform}-bundles.json`,
						),
						analyzerMode: 'json',
						openAnalyzer: false,
						logLevel: 'warn',
					}),
			  ]),
	],
	infrastructureLogging: {
		level: PROD ? 'info' : 'warn',
	},
});

/** @type {readonly Build[]} */
const clientBuilds = [
	'client.web',
	...((PROD && BUILD_VARIANT_SWITCH) || BUILD_VARIANT
		? /** @type {const} */ (['client.web.variant'])
		: []),
	'client.apps',
	'client.editionsCrossword',
];

module.exports = [
	merge(
		commonConfigs({
			platform: 'server',
		}),
		require(`./webpack.config.server`),
		DEV ? require(`./webpack.config.dev-server`) : {},
	),
	...clientBuilds.map((build) =>
		merge(
			commonConfigs({
				platform: build,
			}),
			require(`./webpack.config.client`)({
				build,
			}),
		),
	),
];
