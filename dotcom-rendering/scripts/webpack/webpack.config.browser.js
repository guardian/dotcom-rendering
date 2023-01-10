const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const swcConfig = require('./.swcrc.json');
const { getBrowserTargets } = require('./browser-targets');
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
					loader: 'swc-loader',
					options: {
						...swcConfig,
						env: {
							// debug: true,
							dynamicImport: true,
							targets: getBrowserTargets(),
						},
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
	}
};

/**
 * @param {{ bundle: 'legacy' | 'modern'  | 'variant', sessionId: string }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ bundle, sessionId }) => ({
	entry: {
		index: './src/web/browser/index.ts',
		debug: './src/web/browser/entries/debug/index.ts',
	},
	optimization: DEV
		? {}
		: {
				splitChunks: {
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/](preact|swr|@emotion)[\\/]/,
							name: 'vendor',
							chunks: 'all',
						},
					},
				},
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

module.exports.getLoaders = getLoaders;
