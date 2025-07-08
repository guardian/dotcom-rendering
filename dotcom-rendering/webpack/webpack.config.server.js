// @ts-check
const nodeExternals = require('webpack-node-externals');
const swcConfig = require('./.swcrc.json');
const { svgr } = require('./svg.cjs');

const DEV = process.env.NODE_ENV === 'development';
const nodeVersion = process.versions.node;

const swcLoader = [
	{
		loader: 'swc-loader',
		options: {
			...swcConfig,
			minify: DEV ? false : true,
			env: {
				targets: {
					node: nodeVersion,
				},
			},
		},
	},
];

/** @type {import('webpack').Configuration} */
module.exports = {
	entry: {
		server: './src/server/server.ts',
	},
	output: {
		filename: `[name].js`,
		chunkFilename: `[name].js`,
		libraryTarget: 'commonjs2',
		pathinfo: true,
		publicPath: '',
	},
	target: 'node',
	externalsPresets: { node: true },
	optimization: {
		minimize: false,
		runtimeChunk: false,
	},
	externals: [
		// https://github.com/liady/webpack-node-externals/issues/105
		...(DEV
			? [
					nodeExternals({
						allowlist: [
							/^@guardian/,
							// this project is ESM-only and throws an error when not bundled
							'screenfull',
						],
						additionalModuleDirs: [
							// Since we use workspaces for the monorepo, node_modules will be co-located
							// both in the '(project-root)/dotcom-rendering/node_modules' directory (default for webpack-node-externals)
							// but also in project root, and any workspaces we link to.
							// We want to make sure all of these are removed from the server build.
							'../node_modules',
						],
					}),
			  ]
			: []),
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
	],
	module: {
		rules: [
			{
				test: /(\.tsx|\.js|\.ts)$/,
				use: swcLoader,
			},
			svgr,
		],
	},
};
