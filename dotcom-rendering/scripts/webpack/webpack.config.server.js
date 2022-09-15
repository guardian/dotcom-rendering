// @ts-check
import { readFile } from 'fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import GuStatsReportPlugin from './plugins/gu-stats-report-plugin.js';

const DEV = process.env.NODE_ENV === 'development';

/** The (major.minor) node version */
const version = await readFile(
	join(fileURLToPath(import.meta.url), '..', '..', '..', '..', '.nvmrc'),
	'utf-8',
).then((s) => s.split('.').slice(0, 2).join('.'));

/** @type {(options: { sessionId: string } ) => import('webpack').Configuration} */
export default ({ sessionId }) => ({
	entry: {
		'frontend.server': './src/server/index.ts',
	},
	output: {
		filename: `[name].cjs`,
		chunkFilename: `[name].cjs`,
		libraryTarget: 'commonjs2',
		pathinfo: true,
	},
	target: `node${version}`,
	externalsPresets: { node: true },
	optimization: {
		minimize: false,
		runtimeChunk: false,
	},
	externals: [
		nodeExternals({
			allowlist: [/^@guardian/],
			additionalModuleDirs: [
				// Since we use yarn-workspaces for the monorepo, node_modules will be co-located
				// both in the '(project-root)/dotcom-rendering/node_modules' directory (default for webpack-node-externals)
				// but also in project root, and any workspaces we link to (like common-rendering).
				// We want to make sure all of these are removed from the server build.
				'../node_modules',
				'../common-rendering/node_modules',
			],
		}),
		// @aws-sdk modules are only used in CODE/PROD, so we don't need to
		// include them in the development bundle
		({ request }, callback) => {
			return process.env.NODE_ENV === 'development' &&
				request?.startsWith('@aws-sdk')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
		({ request }, callback) => {
			return request?.endsWith('manifest.json')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
		({ request }, callback) => {
			return request?.endsWith('manifest.legacy.json')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
	],
	plugins: DEV
		? [
				new GuStatsReportPlugin({
					displayDisclaimer: true,
					buildName: 'server',
					project: 'dotcom-rendering',
					team: 'dotcom',
					sessionId,
				}),
		  ]
		: undefined,
	module: {
		rules: [
			{
				test: /(\.tsx|\.js|\.ts)$/,
				exclude: {
					and: [/node_modules/],
					not: [/@guardian/, /dynamic-import-polyfill/],
				},
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								// TODO: remove @babel/preset-react once we stop using JSX in server folder
								'@babel/preset-react',
								[
									'@babel/preset-env',
									{
										targets: {
											node: 'current',
										},
									},
								],
							],
							compact: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.build.json',
							transpileOnly: true,
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
});
