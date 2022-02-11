/* eslint-disable @typescript-eslint/no-var-requires */
const GuStatsReportPlugin = require('./plugins/gu-stats-report-plugin');

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
const GITHUB = process.env.CI_ENV === 'github';

// We need to distinguish files compiled by @babel/preset-env with the prefix "legacy"
const generateName = (isLegacyJS) => {
	const legacyString = isLegacyJS ? '.legacy' : '';
	const chunkhashString = PROD && !GITHUB ? '.[chunkhash]' : '';
	return `[name]${legacyString}${chunkhashString}.js`;
};

module.exports = ({ isLegacyJS, sessionId }) => ({
	entry: {
		sentryLoader: './src/web/browser/sentryLoader/init.ts',
		bootCmp: './src/web/browser/bootCmp/init.ts',
		ga: './src/web/browser/ga/init.ts',
		ophan: './src/web/browser/ophan/init.ts',
		islands: './src/web/browser/islands/init.ts',
		react: './src/web/browser/react/init.ts',
		dynamicImport: './src/web/browser/dynamicImport/init.ts',
		atomIframe: './src/web/browser/atomIframe/init.ts',
		coreVitals: './src/web/browser/coreVitals/init.ts',
		embedIframe: './src/web/browser/embedIframe/init.ts',
		newsletterEmbedIframe:
			'./src/web/browser/newsletterEmbedIframe/init.ts',
		relativeTime: './src/web/browser/relativeTime/init.ts',
		initDiscussion: './src/web/browser/initDiscussion/init.ts',
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
		DEV &&
			new GuStatsReportPlugin({
				buildName: isLegacyJS ? 'legacy-client' : 'client',
				project: 'dotcom-rendering',
				team: 'dotcom',
				sessionId,
			}),
	].filter(Boolean),
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

module.exports.babelExclude = {
	and: [/node_modules/],
	not: [
		// Include all @guardian modules, except automat-modules
		/@guardian\/(?!(automat-modules))/,

		// Include the dynamic-import-polyfill
		/dynamic-import-polyfill/,
	],
};
