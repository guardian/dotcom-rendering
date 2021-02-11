/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { dist } = require('../frontend/config');

const PROD = process.env.NODE_ENV === 'production';

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
			'@root': path.resolve(__dirname, '.'),
			'@frontend': path.resolve(__dirname, 'src'),
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
		require(`./server`)(),
	),
	// browser bundle configs
	// TODO: ignore static files for legacy compliation
	merge(
		commonConfigs({
			platform: 'browser.legacy',
		}),
		require(`./browser`)({
			isLegacyJS: true,
		}),
	),
	merge(
		commonConfigs({
			platform: 'browser',
		}),
		require(`./browser`)({
			isLegacyJS: false,
		}),
	),
];
