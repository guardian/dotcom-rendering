// ----- Imports ----- //

import type { ChildProcess } from 'child_process';
import { fork } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import CleanCSS from 'clean-css';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Compiler, Configuration, ResolveOptions } from 'webpack';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import nodeExternals from 'webpack-node-externals';
import { renederedItemsAssetsCss } from './config/rendered-items-assets-styles';
import { WebpackPluginInstance } from 'webpack';

// ----- Plugins ----- //

class LaunchServerPlugin {
	server?: ChildProcess;
	apply(compiler: Compiler): void {
		compiler.hooks.afterEmit.tap('LaunchServerPlugin', () => {
			console.log('Server starting...');
			this.server = fork('./dist/server.js');
			this.server.on('close', () => console.log('Server stopping...'));
		});

		compiler.hooks.watchRun.tap('LaunchServerPlugin', () => {
			if (this.server) {
				this.server.kill();
			}
		});
	}
}

// ----- Shared Config ----- //

function resolve(
	loggerName: string,
	isClient: boolean = false,
): ResolveOptions {
	const resolveOptions: ResolveOptions = {
		extensions: ['.ts', '.tsx', '.js'],
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		alias: {
			logger: path.resolve(__dirname, `src/logger/${loggerName}`),
			react: path.resolve('./node_modules/react'),
			// This line exists because atoms-rendering imports `preact-render-to-string`
			// https://github.com/guardian/atoms-rendering/blob/24b166fc40d125b33ae9ac56d3535c27b0ff5304/src/lib/unifyPageContent.tsx#L2
			//
			// It works to keep the compiler happy, but it will crash at runtime
			// because it's imported as default, whereas ReactDOM exports
			// as a named method. This isn't a problem for now because it
			// only affects Interactive Atoms, and we don't use atoms-rendering
			// for those yet.
			//
			// I think a better solution would be for atoms-rendering to import
			// `react-dom/server`, and for DCR to alias that to `preact-render-to-string`.
			// Then we can get rid of this line.
			'preact-render-to-string': 'react-dom/server',
		},
	};

	// Webpack 5 removed a lot of the nodejs polyfills including Buffer
	// We rely on Buffer for our bridget thrift client
	if (isClient) {
		resolveOptions.alias = { ...resolveOptions.alias, Buffer: 'buffer' };
	}

	return resolveOptions;
}

const serverResolve = resolve('server');
const clientResolveDev = resolve('clientDev', true);
const clientResolveProd = resolve('clientProd', true);

// ----- Configs ----- //

const serverConfig = (
	env: Record<string, boolean | undefined>,
): Configuration => {
	const isProd = env?.production;
	const isWatch = env?.watch;
	// Does not try to require the 'canvas' package,
	// an optional dependency of jsdom that we aren't using.
	const plugins: WebpackPluginInstance[] = [
		new webpack.IgnorePlugin({ resourceRegExp: /^canvas$/ }),
	];
	if (isWatch) {
		plugins.push(new LaunchServerPlugin());
	}

	const mode = isProd ? 'production' : 'development';

	return {
		name: 'server',
		mode,
		entry: 'server/server.ts',
		target: 'node',
		externals: isProd
			? []
			: [
					nodeExternals({
						allowlist: [/@guardian/],
					}),
			  ],

		node: {
			__dirname: false,
		},
		output: {
			filename: isProd ? 'server/server.js' : 'server.js',
		},
		watch: isWatch,
		watchOptions: {
			ignored: /node_modules/,
		},
		resolve: serverResolve,
		plugins: plugins,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									[
										'@babel/preset-react',
										{
											runtime: 'automatic',
											importSource: '@emotion/core',
										},
									],
								],
								plugins: ['@emotion'],
							},
						},
						{
							loader: 'ts-loader',
							options: {
								configFile: 'config/tsconfig.server.json',
							},
						},
					],
				},
			],
		},
		optimization: {
			minimize: false,
		},
		devtool: 'inline-cheap-source-map',
	};
};

export const clientConfig: Configuration = {
	name: 'client',
	mode: 'development',
	entry: {
		article: 'client/article.ts',
		editions: 'client/editions.ts',
	},
	target: 'web',
	devtool: 'inline-cheap-source-map',
	output: {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: '[name].js',
	},
	plugins: [
		new WebpackManifestPlugin({ writeToFileEmit: true }),
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
	],
	resolve: clientResolveDev,
	devServer: {
		publicPath: '/assets/',
		proxy: {
			'**': 'http://localhost:3040',
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-react',
									{
										runtime: 'automatic',
										importSource: '@emotion/core',
									},
								],

								[
									'@babel/preset-env',
									{
										// Babel recommends installing corejs as a peer dependency
										// and specifying the version used here
										// https://babeljs.io/docs/en/babel-preset-env#usebuiltins
										// This should automatically inject polyfills as needed,
										// based on our code and the browserslist in package.json
										useBuiltIns: 'usage',
										corejs: 3,
										modules: false,
										targets: { esmodules: true },
									},
								],
							],
							plugins: ['@emotion'],
						},
					},
					{
						loader: 'ts-loader',
						options: { configFile: 'config/tsconfig.client.json' },
					},
				],
			},
		],
	},
};

const assetsTemplateCss = new CleanCSS()
	.minify(renederedItemsAssetsCss)
	.styles.trim();
const assetHash = (asset: string): string =>
	createHash('sha256').update(asset).digest('base64');

const clientConfigProduction = {
	...clientConfig,
	name: 'clientProduction',
	mode: 'production',
	devtool: false,
	plugins: [
		new WebpackManifestPlugin(),
		new HtmlWebpackPlugin({
			meta: {
				'Content-Security-Policy': {
					'http-equiv': 'Content-Security-Policy',
					content: `style-src 'sha256-${assetHash(
						assetsTemplateCss,
					)}';`,
				},
			},
			filename: 'rendered-items-assets.html',
			template: path.resolve(
				__dirname,
				'config/rendered-items-assets-template.html',
			),
			minify: true,
			templateParameters: {
				styles: assetsTemplateCss,
			},
		}),
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
	],
	output: {
		path: path.resolve(__dirname, 'dist/assets'),
		publicPath: '',
		filename: '[name].[contenthash].js',
	},
	resolve: clientResolveProd,
};

// ----- Exports ----- //

export default [serverConfig, clientConfig, clientConfigProduction];
