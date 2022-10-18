const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const GuStatsReportPlugin = require('./plugins/gu-stats-report-plugin');

const DEV = process.env.NODE_ENV === 'development';

/**
 * @param {'legacy' | 'modern' | 'variant'} bundle
 * @returns {string}
 */
const generateName = (bundle) => {
	const chunkhashString = DEV ? '' : '.[chunkhash]';
	return `[name].${bundle}${chunkhashString}.js`;
};

/**
 * @param {'legacy' | 'modern' | 'variant'} bundle
 * @returns {string}
 */
const getLoaders = (bundle) => {
	switch (bundle) {
		case 'legacy':
			return [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
							[
								'@babel/preset-env',
								{
									targets: {
										ie: '11',
									},
									modules: false,
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
			];
		case 'variant':
			return [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
							[
								'@babel/preset-env',
								{
									bugfixes: true,
									targets:
										'extends @guardian/browserslist-config',
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
			];
		case 'modern':
			return [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-react',
							[
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
			];
	}
};

/**
 * @param {{ bundle: 'legacy' | 'modern'  | 'variant', sessionId: string }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ bundle, sessionId }) => ({
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
		debug: './src/web/browser/debug/init.ts',
	},
	output: {
		filename: (data) => {
			// We don't want to hash the debug script so it can be used in bookmarklets
			if (data.chunk.name === 'debug') return `[name].js`;
			return generateName(bundle);
		},
		chunkFilename: generateName(bundle),
		publicPath: '',
	},
	plugins: [
		new WebpackManifestPlugin({
			fileName: `manifest.${bundle}.json`,
		}),
		...(DEV
			? [
					new GuStatsReportPlugin({
						buildName: `${bundle}-client`,
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
				use: getLoaders(bundle),
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
