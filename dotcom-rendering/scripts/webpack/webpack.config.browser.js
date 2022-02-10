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

const scriptPath = (dcrPackage) =>
	[`./src/web/browser/${dcrPackage}/init.ts`].filter(Boolean);

module.exports = ({ isLegacyJS, sessionId }) => ({
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
