/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { v4: uuidv4 } = require('uuid');

const PROD = process.env.NODE_ENV === 'production';
const INCLUDE_LEGACY = process.env.SKIP_LEGACY !== 'true';
const dist = path.resolve(__dirname, '..', '..', 'dist');

const sessionId = uuidv4();

const commonConfigs = ({ platform }) => ({
	name: platform,
	mode: process.env.NODE_ENV,
	output: {
		path: dist,
	},
	stats: 'errors-only',
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
		PROD &&
			new BundleAnalyzerPlugin({
				reportFilename: path.join(dist, `${platform}-bundles.html`),
				analyzerMode: 'static',
				openAnalyzer: false,
				logLevel: 'warn',
			}),
		// https://www.freecodecamp.org/forum/t/algorithm-falsy-bouncer-help-with-how-filter-boolean-works/25089/7
		// [...].filter(Boolean) why it is used
	].filter(Boolean),
});

module.exports = [
	// server bundle config
	merge(
		commonConfigs({
			platform: 'server',
		}),
		require(`./webpack.config.server`)({ sessionId }),
	),
	// browser bundle configs
	// TODO: ignore static files for legacy compliation
	INCLUDE_LEGACY &&
		merge(
			commonConfigs({
				platform: 'browser.legacy',
			}),
			require(`./webpack.config.browser`)({
				isLegacyJS: true,
				sessionId,
			}),
		),
	merge(
		commonConfigs({
			platform: 'browser',
		}),
		require(`./webpack.config.browser`)({
			isLegacyJS: false,
			sessionId,
		}),
	),
].filter(Boolean);
