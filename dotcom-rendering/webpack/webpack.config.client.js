const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const swcConfig = require('./.swcrc.json');
const { getBrowserTargets } = require('./browser-targets');
const { svgr } = require('./svg.cjs');

const DEV = process.env.NODE_ENV === 'development';

/** @param {Record<string, string> | string[]} targets */
const swcLoader = (targets) => [
	{
		loader: 'swc-loader',
		options: {
			...swcConfig,
			env: {
				dynamicImport: true,
				targets,
			},
		},
	},
];

/**
 * Client bundles must parse on every browser we support, including Safari
 * < 13.4 (iOS 13). Several dependencies publish modern syntax in their built
 * output — @sentry/core ships `integration?.afterAllSetup`, screenfull ships
 * `n?.[1]` — and any one of them landing in an initial chunk is a parse error
 * that aborts all client JS before it runs, including the CMP.
 *
 * Maintaining an allowlist of "packages that happen to ship modern syntax" is
 * unwinnable: it silently breaks whenever a dependency modernises. So for the
 * client we transpile everything and let swc downlevel to our browser targets.
 *
 * The server build deliberately keeps `transpileExclude` below, since it runs
 * on a current Node and gains nothing from transpiling node_modules.
 *
 * `undefined` means "exclude nothing".
 */
const clientTranspileExclude = undefined;

/** @typedef {import('../src/lib/assets').Build} Build*/

/**
 * @param {Build} build
 * @returns {string}
 */
const generateName = (build) => {
	const chunkhashString = DEV ? '' : '.[chunkhash]';
	return `[name].${build}${chunkhashString}.js`;
};

/**
 * @param {Build} build
 * @returns {string}
 */
const getEntryIndex = (build) => {
	switch (build) {
		case 'client.editionsCrossword':
			return './src/client/main.editionsCrossword.tsx';
		case 'client.apps':
			return './src/client/main.apps.ts';
		default:
			return './src/client/main.web.ts';
	}
};

/**
 * @param {Build} build
 * @returns {{ loader: string, options: Record<string, unknown>}}
 */
const getLoaders = (build) => {
	switch (build) {
		case 'client.editionsCrossword':
		case 'client.apps':
			return swcLoader(['android >= 5', 'ios >= 12']);
		case 'client.web.variant':
		case 'client.web':
			return swcLoader(getBrowserTargets());
	}
};

/**
 * @param {{ build: Build }} options
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ build }) => ({
	entry: {
		index: getEntryIndex(build),
		debug: './src/client/debug/debug.ts',
	},
	optimization: {
		/**
		 * Terser rewrites already-transpiled output back into modern syntax
		 * when it assumes a modern target, e.g.
		 *
		 *   `x == null ? a : x`  ->  `x ?? a`
		 *   `a && a.b()`         ->  `a?.b()`
		 *
		 * Neither preact nor lodash ship `??` in their published source — the
		 * minifier introduces it after swc has correctly transpiled it away.
		 * That is a *parse* error on Safari < 13.4 (e.g. iOS 13 on an iPhone
		 * 11), and because it lands in initial chunks the whole bundle dies
		 * before any of our code runs — including the CMP, which is compiled
		 * into the entry chunk via `webpackMode: "eager"`.
		 *
		 * Pinning `ecma` keeps minified output within a grammar our supported
		 * browsers can parse. `safari10` additionally guards against known
		 * Safari 10 let/const and for-loop miscompilations.
		 */
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					ecma: 2019,
					safari10: true,
					compress: { ecma: 2019 },
					format: { ecma: 2019, safari10: true },
				},
			}),
		],
		// We don't need chunk optimization for apps as we use the 'LimitChunkCountPlugin' to produce just 1 chunk
		...(build === 'client.apps' || build === 'client.editionsCrossword'
			? {}
			: {
					splitChunks: {
						cacheGroups: {
							// our own chunk, which is shared between all bundles
							frameworks: {
								test: /[\\/]node_modules[\\/](preact|react-is|hoist-non-react-statistics|swr|@emotion|stylis)[\\/]/,
								chunks: 'all',
								name: 'frameworks',
								enforce: true,
							},
							// defining our own chunk above overrides the webpack defaults,
							// so now we restore them
							// https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
							defaultVendors: {
								test: /[\\/]node_modules[\\/]/,
								priority: -10,
								reuseExistingChunk: true,
							},
							default: {
								minChunks: 2,
								priority: -20,
								reuseExistingChunk: true,
							},
						},
					},
				}),
	},
	output: {
		filename: (data) => {
			// We don't want to hash the debug script so it can be used in bookmarklets
			if (data.chunk.name === 'debug') {
				return `[name].js`;
			}
			return generateName(build);
		},
		chunkFilename: generateName(build),
		publicPath: '',
		/**
		 * Constrains the syntax webpack is allowed to emit.
		 *
		 * Two things read this:
		 *
		 * 1. Webpack's own generated runtime (chunk loading, module wrappers),
		 *    which is NOT processed by swc-loader and therefore ignores our
		 *    browser targets entirely.
		 * 2. Terse OrPlugin, which otherwise "optimises" transpiled output back
		 *    into modern syntax, e.g. rewriting `x == null ? a : x` to
		 *    `x ?? a` and `a && a.b()` to `a?.b()`.
		 *
		 * Both produce optional chaining / nullish coalescing, which is a
		 * *parse* error on Safari < 13.4 (e.g. iOS 13 on an iPhone 11). Because
		 * these land in initial chunks, the whole bundle fails before any of our
		 * code runs — including the CMP, which is compiled into the entry chunk
		 * via `webpackMode: "eager"`.
		 *
		 * @see https://webpack.js.org/configuration/output/#outputenvironment
		 */
		environment: {
			arrowFunction: true,
			const: true,
			destructuring: true,
			dynamicImport: true,
			forOf: true,
			module: false,
			optionalChaining: false,
			templateLiteral: true,
		},
	},
	plugins: [
		new WebpackManifestPlugin({
			fileName: `manifest.${build}.json`,
		}),
		...(build === 'client.apps' || build === 'client.editionsCrossword'
			? [
					new webpack.optimize.LimitChunkCountPlugin({
						maxChunks: 1,
					}),
					new webpack.ProvidePlugin({
						Buffer: ['buffer', 'Buffer'],
					}),
				]
			: []),
	],
	externals: getExternalModules(build),
	module: {
		rules: [
			{
				test: /\.[jt]sx?|mjs$/,
				exclude: clientTranspileExclude,
				use: getLoaders(build),
			},
			{
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader'],
			},
			svgr,
		],
	},
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
	},
});

module.exports.transpileExclude = {
	// Exclude node_modules from transpilation
	and: [/node_modules/],
	// Do not exclude i.e. include
	not: [
		// Include all @guardian modules
		/@guardian\//,
		// Include the dynamic-import-polyfill
		/dynamic-import-polyfill/,
		/valibot/,
		/**
		 * @sentry/* publish optional chaining in their built output, e.g.
		 * `integration?.afterAllSetup` in @sentry/core's ESM build. That is a
		 * parse error on Safari < 13.4 (iOS 13), which would otherwise take out
		 * the apps bundle entirely — and, on web, silently break the very
		 * thing meant to report the failure.
		 *
		 * Terser's `ecma` ceiling does not help here: it prevents the minifier
		 * *introducing* modern syntax, but does not down-level syntax already
		 * present in the source. Only swc can do that, so these packages must
		 * be transpiled rather than excluded.
		 */
		/@sentry\//,
	],
};

module.exports.getLoaders = getLoaders;

/**
 * We are making "@guardian/ophan-tracker-js" external to the apps bundle
 * because we never expect to use it in apps pages.
 *
 * Tracking is done natively.
 *
 * @param {Build} build */
const getExternalModules = (build) => {
	if (build === 'client.apps') {
		return { '@guardian/ophan-tracker-js': 'guardian.ophan' };
	}
	if (build === 'client.editionsCrossword') {
		return {
			'@guardian/ophan-tracker-js': 'guardian.ophan',
			'@guardian/commercial': 'guardian.commercial',
		};
	}
	return undefined;
};
