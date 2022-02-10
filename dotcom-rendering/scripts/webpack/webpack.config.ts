import path from 'path';
import type { Configuration } from 'webpack';
import { IgnorePlugin, DefinePlugin } from 'webpack';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// @ts-expect-error -- there’s no type definition, yet
import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
// @ts-expect-error -- @types/loadable__webpack-plugin break tsc
import LoadablePlugin from '@loadable/webpack-plugin';
import { v4 as uuidv4 } from 'uuid';
import webpackConfigServer from './webpack.config.server';
import webpackConfigBrowser from './webpack.config.browser';

const PROD = process.env.NODE_ENV === 'production';
const INCLUDE_LEGACY = process.env.SKIP_LEGACY !== 'true';
const dist = path.resolve(__dirname, '..', '..', 'dist');

const sessionId = uuidv4();

type ConfigParam = {
	platform: 'server' | 'browser' | 'browser.legacy';
};

const isWebpackConfiguration = (
	conf: false | Configuration,
): conf is Configuration => conf !== false;

const commonConfigs = ({ platform }: ConfigParam): Configuration => ({
	name: platform,
	mode: PROD ? 'production' : 'development',
	output: {
		path: dist,
	},
	stats: 'errors-only',
	devtool: PROD ? 'source-map' : 'eval-cheap-module-source-map',
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
		new DefinePlugin({
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
		new IgnorePlugin({
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

export default [
	// server bundle config
	merge(
		commonConfigs({
			platform: 'server',
		}),
		webpackConfigServer({ sessionId }),
	),
	// browser bundle configs
	// TODO: ignore static files for legacy compliation
	INCLUDE_LEGACY &&
		merge(
			commonConfigs({
				platform: 'browser.legacy',
			}),
			webpackConfigBrowser({
				isLegacyJS: true,
				sessionId,
			}),
		),
	merge(
		commonConfigs({
			platform: 'browser',
		}),
		webpackConfigBrowser({
			isLegacyJS: false,
			sessionId,
		}),
	),
].filter(Boolean);
