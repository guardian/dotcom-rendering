// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import { success, warn } from '../../../scripts/log.js';
import { getContentFromURLMiddleware } from '../../src/server/lib/get-content-from-url.js';
import { base } from './base.mjs';
import { default as apps } from './client.apps.mjs';
import { default as webLegacy } from './client.web.legacy.mjs';
import { default as web } from './client.web.mjs';
import { default as webVariant } from './client.web.variant.mjs';
import { server } from './server.mjs';
import { isProd } from './utils/env.mjs';

const DIRNAME = fileURLToPath(new URL('.', import.meta.url));

/** @type {(bundle?: string) => import("webpack").Configuration} */
const getWebBundle = (bundle) => {
	switch (bundle) {
		case 'legacy':
			return webLegacy;
		case 'variant':
			return webVariant;
		default:
			return web;
	}
};

const baseConfig = base(import.meta.url);

if (isProd) {
	warn('Running the DEV server in production is not allowed');
	process.exit(1);
}

/** @type {import("webpack").Configuration} */
export const serverDev = {
	entry: './src/server/server.dev.ts',
	/** @type {import('webpack-dev-server').Configuration} */
	devServer: {
		compress: false,
		hot: false,
		liveReload: true,
		client: {
			logging: 'warn',
			overlay: true,
		},
		port: 3030,
		static: {
			directory: path.join(DIRNAME, '..', '..', 'src', 'static'),
			publicPath: '/static/frontend',
		},
		onListening: ({ options: { port } }) => {
			if (typeof port !== 'number') return;
			success(
				[
					'DEV server running on ',
					'\x1b[36m', // cyan
					'\x1b[4m', // underline
					`http://localhost:${port}`,
					'\x1b[0m', // reset
				].join(''),
			);
		},
		// headers: (req, res) => {
		// 	console.log(req, res);
		// 	return {};
		// },
		allowedHosts: ['r.thegulocal.com'],
		devMiddleware: {
			publicPath: baseConfig.output?.publicPath,
			serverSideRender: true,
			headers: (req, res) => {
				// Allow any localhost request from accessing the assets
				if (
					req.hostname === (process.env.HOSTNAME || 'localhost') &&
					req.headers.origin
				)
					res.setHeader(
						'Access-Control-Allow-Origin',
						req.headers.origin,
					);
			},
		},
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer.app) {
				throw new Error('webpack-dev-server is not defined');
			}

			// it turns out webpack dev server is just an express server
			// with webpack-dev-middleware, so here we add some other middlewares
			// of our own

			devServer.app.use(bodyParser.json({ limit: '10mb' }));

			// populates req.body with the content data from a production
			// URL if req.params.url is present
			devServer.app.use(getContentFromURLMiddleware);

			devServer.app.get('/', (req, res) => {
				res.sendFile(
					path.join(
						DIRNAME,
						'..',
						'..',
						'src',
						'server',
						'dev-index.html',
					),
				);
			});

			if (devServer.compiler instanceof webpack.MultiCompiler) {
				// webpack-hot-server-middleware needs to run after webpack-dev-middleware
				middlewares.push({
					name: 'server',
					middleware: webpackHotServerMiddleware(devServer.compiler),
				});
			}

			return middlewares;
		},
	},
	externals: [
		// https://github.com/liady/webpack-node-externals/issues/105

		nodeExternals({
			allowlist: [/^@guardian/],
			additionalModuleDirs: [
				// Since we use yarn-workspaces for the monorepo, node_modules
				// will be co-located both in the
				// '(project-root)/dotcom-rendering/node_modules' directory
				// (default for webpack-node-externals) but also in project
				// root, and any workspaces we link to. We want to make sure all
				// of these are removed from the server build.
				'../node_modules',
			],
		}),
		// @aws-sdk modules are only used in CODE/PROD, so we don't need to
		// include them in the development bundle
		({ request }, callback) => {
			return request?.startsWith('@aws-sdk')
				? callback(undefined, `commonjs ${request}`)
				: callback();
		},
	],
	module: {
		rules: [
			{
				test: /(\.tsx|\.js|\.ts)$/,
				use: [
					{
						loader: 'swc-loader',
						options: {
							jsc: {
								parser: {
									syntax: 'typescript',
									tsx: true,
									decorators: false,
									dynamicImport: true,
								},
								transform: {
									react: {
										runtime: 'automatic',
										importSource: '@emotion/react',
									},
								},
							},
							sourceMaps: true,
							minify: false,
							env: {
								targets: {
									node: process.versions.node,
								},
							},
						},
					},
				],
			},
		],
	},
};

/**
 * The names of the configurations must start with 'server' or 'client'
 *
 * @see https://www.npmjs.com/package/webpack-hot-server-middleware#usage
 */
const bundles = [
	merge(baseConfig, server, serverDev),
	getWebBundle(process.env.WEB_BUNDLE),
	apps,
].filter(Boolean);

export default bundles;
