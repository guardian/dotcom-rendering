// eslint-disable-next-line @typescript-eslint/no-var-requires
const { siteName } = require('../frontend/config');

module.exports = () => ({
	entry: {
		[`${siteName}.server`]: './src/app/server.ts',
	},
	output: {
		filename: `[name].js`,
		chunkFilename: `[name].js`,
		libraryTarget: 'commonjs2',
		pathinfo: true,
	},
	target: 'node',
	optimization: {
		minimize: false,
		runtimeChunk: false,
	},
	externals: [
		'@loadable/component',
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('webpack-node-externals')({
			allowlist: [/^@guardian/],
		}),
		({ request }, callback) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return request.endsWith('loadable-manifest-browser.json')
				? callback(null, `commonjs ${request}`)
				: callback();
		},
		({ request }, callback) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			return request.endsWith('loadable-manifest-browser.legacy.json')
				? callback(null, `commonjs ${request}`)
				: callback();
		},
	],
	module: {
		rules: [
			{
				test: /(\.tsx|\.js|\.ts)$/,
				exclude: {
					and: [/node_modules/],
					not: [/@guardian/, /dynamic-import-polyfill/],
				},
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-react',
									{
										runtime: 'automatic',
										importSource: '@emotion/react',
									},
								],
								[
									'@babel/preset-env',
									{
										targets: {
											node: 'current',
										},
									},
								],
							],
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
			// TODO: find a way to remove
			{
				test: /\.svg$/,
				use: ['desvg-loader/react', 'svg-loader'],
			},
		],
	},
});
