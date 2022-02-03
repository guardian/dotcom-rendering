import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import chalk from 'chalk';
import externals from 'webpack-node-externals';
import type { WebpackPluginInstance, Compiler, Configuration } from 'webpack';
import GuStatsReportPlugin from './gu-stats-report-plugin';

const DEV = process.env.NODE_ENV === 'development';

type ValidPlugin =
	| WebpackPluginInstance
	| ((this: Compiler, compiler: Compiler) => void);

export const isWebpackPluginInstance = (p: unknown): p is ValidPlugin =>
	p !== false;

export default ({ sessionId }: { sessionId: string }): Configuration => ({
	entry: {
		'frontend.server': './src/app/server.ts',
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
		'@loadable/component',
		externals({
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
			return DEV && request?.startsWith('@aws-sdk')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
		({ request }, callback) => {
			return request?.endsWith('loadable-manifest-browser.json')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
		({ request }, callback) => {
			return request?.endsWith('loadable-manifest-browser.legacy.json')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
	],
	plugins: [
		DEV &&
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [
						'Server build complete',
						`DEV server available at: ${chalk.blue.underline(
							'http://localhost:3030',
						)}`,
					],
					notes: [],
				},
			}),
		DEV &&
			new GuStatsReportPlugin({
				displayDisclaimer: true,
				buildName: 'server',
				project: 'dotcom-rendering',
				team: 'dotcom',
				sessionId,
			}),
	].filter(isWebpackPluginInstance),
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
