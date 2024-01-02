import { merge } from 'webpack-merge';
import { base } from './base.mjs';

/** @type {import("webpack").Configuration} */
export const server = {
	entry: './src/server/server.prod.ts',
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
};

export default merge(base(import.meta.url), server);
