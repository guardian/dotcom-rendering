const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const GuStatsReportPlugin = require('./plugins/gu-stats-report-plugin');

const DEV = process.env.NODE_ENV === 'development';

/**
 * @param {string} extension
 * @returns {string}
 */
const generateName = (extension) => {
	const legacyString = extension !== '' ? `.${extension}` : '';
	const chunkhashString = DEV ? '' : '.[chunkhash]';
	return `[name]${legacyString}${chunkhashString}.js`;
};

/** @typedef {NonNullable<import('webpack').Configuration["optimization"]>["splitChunks"]} SplitChunks */

/**
 * @param {{ extension: string, sessionId: string, splitChunks?: SplitChunks }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ extension, sessionId, splitChunks }) => ({
	entry: {
		sentryLoader: './src/web/browser/sentryLoader/init.ts',
		bootCmp: './src/web/browser/bootCmp/init.ts',
		ga: './src/web/browser/ga/init.ts',
		ophan: './src/web/browser/ophan/init.ts',
		islands: './src/web/browser/islands/init.ts',
		dynamicImport: './src/web/browser/dynamicImport/init.ts',
		atomIframe: './src/web/browser/atomIframe/init.ts',
		embedIframe: './src/web/browser/embedIframe/init.ts',
		newsletterEmbedIframe:
			'./src/web/browser/newsletterEmbedIframe/init.ts',
		relativeTime: './src/web/browser/relativeTime/init.ts',
		initDiscussion: './src/web/browser/initDiscussion/init.ts',
	},
	output: {
		filename: generateName(extension),
		chunkFilename: generateName(extension),
		publicPath: '',
	},
	optimization: {
		splitChunks,
	},
	plugins: [
		new WebpackManifestPlugin({
			fileName:
				extension !== ''
					? `manifest.${extension}.json`
					: 'manifest.json',
		}),
		...(DEV
			? [
					new GuStatsReportPlugin({
						buildName:
							extension !== '' ? `client-${extension}` : 'client',
						project: 'dotcom-rendering',
						team: 'dotcom',
						sessionId,
					}),
			  ]
			: []),
	],
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: module.exports.babelExclude,

				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
								extension === 'legacy'
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

module.exports.babelExclude = {
	and: [/node_modules/],
	not: [
		// Include all @guardian modules, except automat-modules
		/@guardian\/(?!(automat-modules))/,

		// Include the dynamic-import-polyfill
		/dynamic-import-polyfill/,
	],
};
