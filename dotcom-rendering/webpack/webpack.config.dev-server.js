// @ts-check
const path = require('node:path');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const {
	getContentFromURLMiddleware,
} = require('../src/server/lib/get-content-from-url');

const port = 3030;

console.log(
	`${chalk.dim('DEV server running on')} ${chalk.blue.underline(
		`http://localhost:${port}`,
	)}`,
);

module.exports = {
	/** @type {import('webpack-dev-server').Configuration} */
	devServer: {
		compress: false,
		hot: false,
		liveReload: true,
		client: {
			logging: 'warn',
			overlay: true,
		},
		port,
		static: {
			directory: path.join(__dirname, '..', '..', 'src', 'static'),
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
