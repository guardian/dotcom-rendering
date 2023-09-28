// @ts-check
import nodeExternals from 'webpack-node-externals';
import swcConfig from './.swcrc.json' assert { type: 'json' };

const DEV = process.env.NODE_ENV === 'development';
const nodeVersion = process.versions.node;

export const swcLoader = [
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

/** @type {(options: { sessionId: string } ) => import('webpack').Configuration} */
// eslint-disable-next-line import/no-default-export -- this is what Webpack wants
export default ({ sessionId }) => ({
	entry: {
		server: './src/server/index.ts',
	},
	output: {
		filename: `[name].cjs`,
		chunkFilename: `[name].cjs`,
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
		// @ts-expect-error - webpack-node-externals types are incorrect
		// https://github.com/liady/webpack-node-externals/issues/105
		...(DEV
			? [
					nodeExternals({
						allowlist: [/^@guardian/],
						additionalModuleDirs: [
							// Since we use yarn-workspaces for the monorepo, node_modules will be co-located
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
		// @ts-expect-error - webpack-node-externals types are incorrect:
		({ request }, callback) => {
			return process.env.NODE_ENV === 'development' &&
				request?.startsWith('@aws-sdk')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
		// @ts-expect-error - webpack-node-externals types are incorrect
		({ request }, callback) => {
			return request?.endsWith('manifest.json')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
		// @ts-expect-error - webpack-node-externals types are incorrect
		({ request }, callback) => {
			return request?.endsWith('manifest.legacy.json')
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
			// TODO: find a way to remove
			{
				test: /\.svg$/,
				use: ['desvg-loader/react', 'svg-loader'],
			},
		],
	},
});
