// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

import { merge } from 'webpack-merge';
import { base } from './base.mjs';

/** @type {import("webpack").Configuration} */
export const server = {
	entry: {
		server: './src/server/server.ts',
	},
	output: {
		filename: `[name].js`,
		chunkFilename: `[name].js`,
		libraryTarget: 'commonjs2',
		pathinfo: true,
	},
	target: 'node',
	externalsPresets: { node: true },
	optimization: {
		minimize: false,
		runtimeChunk: false,
	},
	externals: [
		({ request }, callback) => {
			return request?.endsWith('manifest.json')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
	],
	module: {
		rules: [
			{
				test: /(\.tsx|\.js|\.ts)$/,
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
							minify: true,
							env: {
								targets: {
									node: process.versions.node,
								},
							},
						},
					},
				],
			},
			// TODO: find a way to remove
			{
				test: /\.svg$/,
				use: ['desvg-loader/react', 'svg-loader'],
			},
		],
	},
};

export default merge(base(import.meta.url), server);
