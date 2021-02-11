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
		require('webpack-node-externals')({
			allowlist: [/^@guardian/],
		}),
		({ request }, callback) => {
			return request.endsWith('loadable-manifest-browser.json')
				? callback(null, `commonjs ${request}`)
				: callback();
		},
		({ request }, callback) => {
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
								// TODO: remove @babel/preset-react once we stop using JSX in server folder
								'@babel/preset-react',
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
