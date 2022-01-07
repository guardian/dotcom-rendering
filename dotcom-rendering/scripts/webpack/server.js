module.exports = () => ({
	entry: {
		'frontend.server': './src/app/server.ts',
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
				test: /\.js?$/,
				loader: 'esbuild-loader',
				exclude: module.exports.babelExclude,
				options: {
					loader: 'js',  // Or 'ts' if you don't need tsx
					target: 'esnext',
				}
			},
			{
				test: /\.ts?$/,
				loader: 'esbuild-loader',
				exclude: module.exports.babelExclude,
				options: {
					loader: 'ts',  // Or 'ts' if you don't need tsx
					target: 'esnext',
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'esbuild-loader',
				exclude: module.exports.babelExclude,
				options: {
					loader: 'tsx',  // Or 'ts' if you don't need tsx
					target: 'esnext',
				}
			},
			// TODO: find a way to remove
			{
				test: /\.svg$/,
				use: ['desvg-loader/react', 'svg-loader'],
			},
		],
	},
});
