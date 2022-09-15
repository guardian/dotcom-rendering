// @ts-check
import { resolve as _resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import { merge } from 'webpack-merge';
import WebpackMessages from 'webpack-messages';
import { log } from '../env/log.js';
import webpackBrowser from './webpack.config.browser.js';
import webpackDevServer from './webpack.config.dev-server.js';
import webpackServer from './webpack.config.server.js';

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const INCLUDE_LEGACY = process.env.SKIP_LEGACY !== 'true';
const dist = _resolve(fileURLToPath(import.meta.url), '..', '..', '..', 'dist');

const sessionId = uuidv4();

const { DefinePlugin, IgnorePlugin } = webpack;

let builds = 0;

/**
 * @param {{ platform: 'server' | 'browser' | 'browser.legacy'}} options
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
	plugins: [
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
		}),
		// @ts-expect-error -- the types are missing
		new FilterWarningsPlugin({
			exclude: /export .* was not found in/,
		}),
		// Matching modules specified in this regex will not be imported during the webpack build
		// We use this if there are optional dependencies (e.g in jsdom, ws) to remove uneccesary warnings in our builds / console outpouts.
		new IgnorePlugin({
			resourceRegExp: /^(canvas|bufferutil|utf-8-validate)$/,
		}),
		// @ts-expect-error -- somehow the type declaration isn’t playing nice
		...(DEV
			? // DEV plugins
			  [
					new WebpackMessages({
						name: platform,
						/** @type {(message: string) => void} */
						logger: (message) => {
							// distinguish between initial and subsequent (re)builds in console output
							if (builds < configs.length * 2) {
								log(
									message
										.replace('Building', 'Building initial')
										.replace(
											'Completed',
											'Completed initial',
										),
								);
							} else {
								log(message.replace('Building', 'Rebuilding'));
							}

							builds += 1;
						},
					}),
			  ]
			: // PROD plugins
			  [
					new BundleAnalyzerPlugin({
						reportFilename: join(dist, `${platform}-bundles.html`),
						analyzerMode: 'static',
						openAnalyzer: false,
						logLevel: 'warn',
					}),
			  ]),
	],
	infrastructureLogging: {
		level: PROD ? 'info' : 'warn',
	},
});

const configs = [
	// server bundle config
	merge(
		commonConfigs({
			platform: 'server',
		}),
		webpackServer({ sessionId }),
		DEV ? webpackDevServer : {},
	),
	// browser bundle configs
	// TODO: ignore static files for legacy compilation
	...(INCLUDE_LEGACY
		? [
				merge(
					commonConfigs({
						platform: 'browser.legacy',
					}),
					webpackBrowser({
						isLegacyJS: true,
						sessionId,
					}),
				),
		  ]
		: []),
	merge(
		commonConfigs({
			platform: 'browser',
		}),
		webpackBrowser({
			isLegacyJS: false,
			sessionId,
		}),
	),
];

// eslint-disable-next-line import/no-default-export -- this is how Webpack works
export default configs;
