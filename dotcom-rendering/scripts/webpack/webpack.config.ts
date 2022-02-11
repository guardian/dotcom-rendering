import path from 'path';
import type { Configuration } from 'webpack';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import { v4 as uuidv4 } from 'uuid';
import WebpackMessages from 'webpack-messages';

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const INCLUDE_LEGACY = process.env.SKIP_LEGACY !== 'true';
const dist = path.resolve(__dirname, '..', '..', 'dist');

const sessionId = uuidv4();

let builds = 0;

type ConfigParam = {
	platform: 'server' | 'browser' | 'browser.legacy';
};
const commonConfigs = ({ platform }: ConfigParam) => ({
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
							if (builds < module.exports.length * 2) {
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
						reportFilename: path.join(
							dist,
							`${platform}-bundles.html`,
						),
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

const configs: Configuration[] = [
	// server bundle config
	merge(
		commonConfigs({
			platform: 'server',
		}),
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require(`./webpack.config.server`)({ sessionId }),
		DEV ? require(`./dev/webpack.config.dev-server`) : {},
	),
	// browser bundle configs
	// TODO: ignore static files for legacy compilation
	...(INCLUDE_LEGACY
		? [
				merge(
					commonConfigs({
						platform: 'browser.legacy',
					}),
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					require(`./webpack.config.browser`)({
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
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require(`./webpack.config.browser`)({
			isLegacyJS: false,
			sessionId,
		}),
	),
];

export default configs;
