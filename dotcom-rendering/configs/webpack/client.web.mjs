// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { merge } from 'webpack-merge';
import { getBrowserTargets } from '../../webpack/browser-targets.js';
import { base } from './base.mjs';

/** @type {import("webpack").Configuration} */
export const web = {
	entry: {
		index: './src/client/main.web.ts',
		debug: './src/client/debug/debug.ts',
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: {
					and: [/node_modules/],
					not: [
						// Include all @guardian modules, except automat-modules
						/@guardian\/(?!(automat-modules))/,
						// Include the dynamic-import-polyfill
						/dynamic-import-polyfill/,
					],
				},
				use: [
					{
						loader: 'swc-loader',
						options: {
							$schema: 'http://json.schemastore.org/swcrc',
							jsc: {
								parser: {
									syntax: 'typescript',
									tsx: true,
									decorators: false,
									dynamicImport: true,
								},
								transform: {
									react: {
										runtime: 'automatic',
										importSource: '@emotion/react',
									},
								},
							},
							sourceMaps: true,
							env: {
								dynamicImport: true,
								targets: getBrowserTargets(),
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							/** this ensures that we keep the viewBox for imported SVGs */
							svgo: false,
						},
					},
				],
			},
		],
	},
	plugins: [
		new WebpackManifestPlugin({ fileName: 'manifest.client.web.json' }),
	],
	optimization: {
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
};

export default merge(base(import.meta.url), web);
