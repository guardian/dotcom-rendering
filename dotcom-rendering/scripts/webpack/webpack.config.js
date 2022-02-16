import { resolve, join } from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { v4 as uuidv4 } from 'uuid';
import WebpackMessages from 'webpack-messages';

import webpackConfigBrowser from './webpack.config.browser.js';
import webpackConfigServer from './webpack.config.server.js';
import webpackDevServer from './webpack.config.dev-server.js';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(import.meta.url);

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const INCLUDE_LEGACY = process.env.SKIP_LEGACY !== 'true';
const dist = resolve(__dirname, '..', '..', 'dist');

const sessionId = uuidv4();

let builds = 0;

const commonConfigs = ({ platform }) => ({
	name: platform,
	mode: process.env.NODE_ENV,
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new FilterWarningsPlugin({
			exclude: /export .* was not found in/,
		}),
		new LoadablePlugin({
			writeToDisk: true,
			filename: `loadable-manifest-${platform}.json`,
		}),
		// Matching modules specified in this regex will not be imported during the webpack build
		// We use this if there are optional dependencies (e.g in jsdom, ws) to remove uneccesary warnings in our builds / console outpouts.
		new webpack.IgnorePlugin({
			resourceRegExp: /^(canvas|bufferutil|utf-8-validate)$/,
		}),
		...(DEV
			? // DEV plugins
			  [
					new WebpackMessages({
						name: platform,
						logger: (message) => {
							// distinguish between initial and subsequent (re)builds in console output
							// eslint-disable-next-line @typescript-eslint/no-use-before-define -- circular dependency with configs
							if (builds < configs.length * 2) {
								message = message
									.replace('Building', 'Building initial')
									.replace('Completed', 'Completed initial');
							} else {
								message = message.replace(
									'Building',
									'Rebuilding',
								);
							}
							console.log(message);
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
		webpackConfigServer({ sessionId }),
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
					webpackConfigBrowser({
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
		webpackConfigBrowser({
			isLegacyJS: false,
			sessionId,
		}),
	),
];

export default configs;
