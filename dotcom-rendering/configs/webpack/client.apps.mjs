// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

// eslint-disable-next-line import/no-named-as-default -- it’s the Webpack way
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { merge } from 'webpack-merge';
import { base } from './base.mjs';

/** @type {import("webpack").Configuration} */
export const apps = {
	entry: {
		index: './src/client/main.apps.ts',
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
								targets: ['android >= 5', 'ios >= 12'],
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
		new WebpackManifestPlugin(),
		// eslint-disable-next-line import/no-named-as-default-member -- the Webpack way
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
	],
	optimization: undefined,
	// We are making "ophan-tracker-js" external to the apps bundle
	// because we never expect to use it in apps pages.
	// Tracking is done natively.
	externals: { 'ophan-tracker-js': 'ophan-tracker-js' },
};

export default merge(base(import.meta.url), apps);
