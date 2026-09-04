// @ts-check
const path = require('node:path');
const express = require('express');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const { dim, reset, blue, underline } = require('../../scripts/log');

const port = 3030;

console.log(
	`${dim}DEV server running on${reset} ${blue}${underline}http://localhost:${port}${reset}`,
);

module.exports = {
	/** @type {import('webpack-dev-server').Configuration} */
	devServer: {
		compress: false,
		hot: false,
		liveReload: true,
		headers: (req) => {
			// Frontend runs on port 9000 and loads DCR assets from port 3030.
			// Apply cross-origin headers to both webpack chunks and static assets.
			/** @type {Record<string, string>} */
			const headers = {
				'Cross-Origin-Resource-Policy': 'cross-origin',
			};

			if (
				req.hostname === (process.env.HOSTNAME ?? 'localhost') &&
				req.headers.origin
			) {
				headers['Access-Control-Allow-Origin'] = req.headers.origin;
			}

			return headers;
		},
		client: {
			logging: 'warn',
			overlay: true,
		},
		port,
		static: {
			directory: path.join(__dirname, '..', 'src', 'static'),
			publicPath: '/static/frontend',
		},
		allowedHosts: ['r.thegulocal.com'],
		devMiddleware: {
			publicPath: '/assets/',
			serverSideRender: true,
			writeToDisk: true,
		},
		setupMiddlewares: (middlewares, devServer) => {
			if (!devServer.app) {
				throw new Error('webpack-dev-server is not defined');
			}

			// it turns out webpack dev server is just an express server
			// with webpack-dev-middleware, so here we add some other middlewares
			// of our own

			devServer.app.use(express.json({ limit: '10mb' }));

			devServer.app.get('/', (req, res) => {
				res.sendFile(
					path.join(
						__dirname,
						'..',
						'src',
						'server',
						'dev-index.html',
					),
				);
			});

			// webpack-hot-server-middleware needs to run after webpack-dev-middleware
			middlewares.push({
				name: 'server',
				// @ts-expect-error -- it’s a MultiCompiler
				middleware: webpackHotServerMiddleware(devServer.compiler, {
					chunkName: 'server',
				}),
			});

			return middlewares;
		},
	},
};
