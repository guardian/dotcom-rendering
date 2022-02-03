import type { Configuration } from 'webpack';
import webpack from 'webpack';
// @ts-expect-error -- @types/friendly-errors-webpack-plugin fails tsc
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import chalk from 'chalk';
import GuStatsReportPlugin from './gu-stats-report-plugin';
import 'webpack-dev-server';
import { isWebpackPluginInstance } from './webpack.config.server';

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const GITHUB = process.env.CI_ENV === 'github';

// We need to distinguish files compiled by @babel/preset-env with the prefix "legacy"
const generateName = (isLegacyJS: boolean) => {
	const legacyString = isLegacyJS ? '.legacy' : '';
	const chunkhashString = PROD && !GITHUB ? '.[chunkhash]' : '';
	return `[name]${legacyString}${chunkhashString}.js`;
};

const isString = (s: string | false): s is string => s !== false;

const scriptPath = (dcrPackage: string): string[] =>
	[
		`./src/web/browser/${dcrPackage}/init.ts`,
		DEV &&
			'webpack-hot-middleware/client?name=browser&overlayWarnings=true',
	].filter(isString);

export const babelExclude = {
	and: [/node_modules/],
	not: [
		// Include all @guardian modules, except automat-modules
		/@guardian\/(?!(automat-modules))/,

		// Include the dynamic-import-polyfill
		/dynamic-import-polyfill/,
	],
};

export default ({
	isLegacyJS,
	sessionId,
}: {
	isLegacyJS: boolean;
	sessionId: string;
}): Configuration => ({
	entry: {
		sentryLoader: scriptPath('sentryLoader'),
		bootCmp: scriptPath('bootCmp'),
		ga: scriptPath('ga'),
		ophan: scriptPath('ophan'),
		islands: scriptPath('islands'),
		react: scriptPath('react'),
		dynamicImport: scriptPath('dynamicImport'),
		atomIframe: scriptPath('atomIframe'),
		coreVitals: scriptPath('coreVitals'),
		embedIframe: scriptPath('embedIframe'),
		newsletterEmbedIframe: scriptPath('newsletterEmbedIframe'),
		relativeTime: scriptPath('relativeTime'),
		initDiscussion: scriptPath('initDiscussion'),
	},
	output: {
		filename: generateName(isLegacyJS),
		chunkFilename: generateName(isLegacyJS),
		publicPath: '',
	},
	// fix for known issue with webpack dynamic imports
	optimization: {
		splitChunks: { cacheGroups: { default: false } },
	},
	plugins: [
		DEV && new webpack.HotModuleReplacementPlugin(),
		DEV &&
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [
						isLegacyJS
							? 'Legacy client build complete'
							: 'Client build complete',
						`DEV server available at: ${chalk.blue.underline(
							'http://localhost:3030',
						)}`,
					],
					notes: [],
				},
			}),
		DEV &&
			new GuStatsReportPlugin({
				buildName: isLegacyJS ? 'legacy-client' : 'client',
				project: 'dotcom-rendering',
				team: 'dotcom',
				sessionId,
			}),
		// https://www.freecodecamp.org/forum/t/algorithm-falsy-bouncer-help-with-how-filter-boolean-works/25089/7
		// [...].filter(Boolean) why it is used
	].filter(isWebpackPluginInstance),
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: babelExclude,

				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
								// @babel/preset-env is used for legacy browsers
								// @babel/preset-modules is used for modern browsers
								// this allows us to reduce bundle sizes
								isLegacyJS
									? [
											'@babel/preset-env',
											{
												targets: {
													ie: '11',
												},
												modules: false,
											},
									  ]
									: [
											'@babel/preset-env',
											{
												bugfixes: true,
												targets: {
													esmodules: true,
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
			{
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader'],
			},
			{
				test: /\.svg$/,
				use: ['desvg-loader/react', 'svg-loader'],
			},
		],
	},
});
