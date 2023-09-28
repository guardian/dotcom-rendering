// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import { merge } from 'webpack-merge';
import WebpackMessages from 'webpack-messages';
import { BUILD_VARIANT as BUILD_VARIANT_SWITCH } from './bundles.mjs';
import webpackConfigClient from './webpack.config.client.mjs';
import webpackConfigServer from './webpack.config.server.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));

const dist = path.resolve(dir, '..', '..', 'dist');
const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

const BUILD_LEGACY = process.env.BUILD_LEGACY === 'true';
const BUILD_VARIANT = process.env.BUILD_VARIANT === 'true';

const sessionId = uuidv4();

/** @typedef {import('../../src/lib/assets.js').Build} Build */

/**
 * @param {{ platform: 'server' | `client.${Build}`}} options
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
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
		symlinks: false,
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
		new FilterWarningsPlugin({
			exclude: /export .* was not found in/,
		}),
		// Matching modules specified in this regex will not be imported during the webpack build
		// We use this if there are optional dependencies (e.g in jsdom, ws) to remove uneccesary warnings in our builds / console outpouts.
		new webpack.IgnorePlugin({
			resourceRegExp: /^(canvas|bufferutil|utf-8-validate)$/,
		}),
		// @ts-expect-error -- somehow the type declaration isn’t playing nice
		...(DEV
			? // DEV plugins
			  [
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
	'web',
	'web.scheduled',
	'web.ophan-esm',
	...((PROD && BUILD_VARIANT_SWITCH) || BUILD_VARIANT
		? /** @type {const} */ (['web.variant'])
		: []),
	// TODO: ignore static files for legacy compilation
	...(PROD || BUILD_LEGACY ? /** @type {const} */ (['web.legacy']) : []),
	'apps',
];

const configs = [
	merge(
		commonConfigs({
			platform: 'server',
		}),
		webpackConfigServer({ sessionId }),
		DEV ? (await import('./webpack.config.dev-server.mjs')).default : {},
	),
	...clientBuilds.map((build) =>
		merge(
			commonConfigs({
				platform: `client.${build}`,
			}),
			webpackConfigClient({
				build,
				sessionId,
			}),
		),
	),
];

// eslint-disable-next-line import/no-default-export -- this is what WebPack wants
export default configs;
