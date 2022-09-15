import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import GuStatsReportPlugin from './plugins/gu-stats-report-plugin.js';

const DEV = process.env.NODE_ENV === 'development';

/**
 * @param {boolean} isLegacyJS
 * @returns {string}
 */
const generateName = (isLegacyJS) => {
	const legacyString = isLegacyJS ? '.legacy' : '';
	const chunkhashString = DEV ? '' : '.[chunkhash]';
	return `[name]${legacyString}${chunkhashString}.js`;
};

/**
 * @param {{ isLegacyJS: boolean, sessionId: string }} options
 * @returns {import('webpack').Configuration}
 */
export default ({ isLegacyJS, sessionId }) => ({
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
			return generateName(isLegacyJS);
		},
		chunkFilename: generateName(isLegacyJS),
		publicPath: '',
	},
	plugins: [
		new WebpackManifestPlugin({
			fileName: isLegacyJS ? 'manifest.legacy.json' : 'manifest.json',
		}),
		...(DEV
			? [
					new GuStatsReportPlugin({
						buildName: isLegacyJS ? 'legacy-client' : 'client',
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
				exclude: babelExclude,

				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-react',
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

export const babelExclude = {
	and: [/node_modules/],
	not: [
		// Include all @guardian modules, except automat-modules
		/@guardian\/(?!(automat-modules))/,

		// Include the dynamic-import-polyfill
		/dynamic-import-polyfill/,
	],
};
