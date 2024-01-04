// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-named-as-default -- it’s how webpack works
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackMessages from 'webpack-messages';
import { isDev, isProd, mode } from './utils/env.mjs';

const DIRNAME = fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_PATH = 'dist';

/**
 * @TODO: add documentation
 *
 * @param {string} name
 * @returns {import('webpack').Configuration}
 */
export const base = (name) => {
	const bundleName = basename(name, '.mjs');
	const DIST = resolve(DIRNAME, '..', '..', OUTPUT_PATH, bundleName);

	return {
		name: bundleName,
		mode,
		output: {
			filename: ({ chunk }) =>
				isProd &&
				// We don't want to hash the debug script so it can be used in
				// bookmarklets
				chunk.name !== 'debug'
					? `[name].[chunkhash].js`
					: `[name].js`,
			chunkFilename: isProd ? `[name].[chunkhash].js` : `[name].js`,
			path: DIST,
			publicPath: '',
		},
		stats: isProd ? 'normal' : 'errors-only',
		devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
		resolve: {
			alias: {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			},
			extensions: ['.js', '.ts', '.tsx', '.jsx'],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode),
				'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
			}),
			// Matching modules specified in this regex will not be imported
			// during the webpack build We use this if there are optional
			// dependencies (e.g in jsdom, ws) to remove unnecessary warnings in
			// our builds / console outputs.
			new webpack.IgnorePlugin({
				resourceRegExp: /^(canvas|bufferutil|utf-8-validate)$/,
			}),
			isProd &&
				new BundleAnalyzerPlugin({
					reportFilename: resolve(DIST, 'stats', `bundles.html`),
					analyzerMode: 'static',
					openAnalyzer: false,
					logLevel: 'warn',
				}),
			isProd &&
				new BundleAnalyzerPlugin({
					reportFilename: resolve(DIST, 'stats', `bundles.json`),
					analyzerMode: 'json',
					openAnalyzer: false,
					logLevel: 'warn',
				}),
			isDev &&
				new WebpackMessages({
					name: bundleName,
				}),
		].filter(Boolean),
		infrastructureLogging: {
			level: isProd ? 'info' : 'warn',
		},
		ignoreWarnings: [
			/**
			 * Express uses dynamic imports to load template engines. As we're
			 * not currently using a template engine in DCR we can ignore this
			 * error.
			 */
			{
				module: /..\/node_modules\/express\/lib\/view.js/,
				message:
					/Critical dependency: the request of a dependency is an expression/,
			},
			/**
			 * Log4js uses dynamic imports to load non-core appenders. We're
			 * only using 'console' and 'file' appenders in DCR which are
			 * specifically imported by log4js without using dynamic imports.
			 */
			{
				module: /..\/node_modules\/log4js\/lib\/appenders\/index.js/,
				message:
					/Critical dependency: the request of a dependency is an expression/,
			},
		],
	};
};
