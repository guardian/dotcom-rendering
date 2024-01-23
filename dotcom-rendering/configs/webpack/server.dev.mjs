// This config is part of a proposed new webpack setup, that provides a
// one-to-one relation between ./configs/webpack/bundle.*.mjs configs and output
// bundles.
//
// It's not in use yet, and neither is the ./configs dir.
//
// If you want to edit the working webpack config, look in:
// ../../scripts/webpack/webpack.config.js.

// THIS IS ONE IS TRICKIER, THIS IS MORE OF A GUIDE FOR HOW TO PROCEED.
// IT'S NOT FINISHED.

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bodyParser from 'body-parser';
// eslint-disable-next-line import/no-named-as-default -- this is the Webpack way
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import { mergeWithRules } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import { success } from '../../../scripts/log.js';
import { getContentFromURLMiddleware } from '../../src/server/lib/get-content-from-url.js';
import { base } from './base.mjs';
import { server } from './server.mjs';

const DIRNAME = fileURLToPath(new URL('.', import.meta.url));

/** @type {import("webpack").Configuration} */
export const devServer = {
	devServer: {
		port: 3030,
		compress: false,
		hot: false,
		liveReload: true,
		client: {
			logging: 'warn',
			overlay: true,
		},
		static: {
			directory: resolve(DIRNAME, '..', '..', 'src', 'static'),
			publicPath: '/static/frontend',
		},
		allowedHosts: ['r.thegulocal.com'],
		devMiddleware: {
			publicPath: '/assets/',
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
		setupMiddlewares: (middlewares, { app, compiler }) => {
			if (!app) {
				throw new Error('webpack-dev-server is not defined');
			}

			// it turns out webpack dev server is just an express server
			// with webpack-dev-middleware, so here we add some other middlewares
			// of our own

			app.use(bodyParser.json({ limit: '10mb' }));

			// populates req.body with the content data from a production
			// URL if req.params.url is present
			app.use(getContentFromURLMiddleware);

			app.get('/', (req, res) => {
				res.sendFile(
					resolve(
						DIRNAME,
						'..',
						'..',
						'src',
						'server',
						'dev-index.html',
					),
				);
			});

			// webpack-hot-server-middleware needs to run after webpack-dev-middleware
			if (compiler instanceof webpack.MultiCompiler) {
				middlewares.push({
					name: 'server',
					middleware: webpackHotServerMiddleware(compiler, {
						chunkName: 'server',
					}),
				});
			}

			return middlewares;
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
	},
	externals: [
		// https://github.com/liady/webpack-node-externals/issues/105

		nodeExternals({
			allowlist: [
				/^@guardian/,
				// this project is ESM-only and throws an error when not bundled
				'screenfull',
			],
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
							minify: false,
						},
					},
				],
			},
		],
	},
};

/**
 * Replace module rules if test matches
 * @see
 * https://github.com/survivejs/webpack-merge?tab=readme-ov-file#mergewithrules
 */
const merge = mergeWithRules({
	module: {
		rules: {
			test: 'match',
			use: [{ loader: 'match', options: 'merge' }],
		},
	},
});

export default merge(base(import.meta.url), server, devServer);
