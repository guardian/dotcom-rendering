import { join } from 'path';
import chalk from 'chalk';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

import { getContentFromURLMiddleware } from '../../src/server/lib/get-content-from-url.js';

const port = 3030;
const __dirname = fileURLToPath(import.meta.url);

console.log(
	`${chalk.dim('DEV server running on')} ${chalk.blue.underline(
		`http://localhost:${port}`,
	)}`,
);

/**
 * @type {import('webpack-dev-server').Configuration}
 */
export const devServer = {
	compress: false,
	hot: false,
	liveReload: true,
	client: {
		logging: 'warn',
		overlay: true,
	},
	port,
	static: {
		directory: join(__dirname, '..', '..', 'src', 'static'),
		publicPath: '/static/frontend',
	},
	devMiddleware: {
		publicPath: '/assets/',
		serverSideRender: true,
		headers: (req, res) => {
			// Allow any localhost request from accessing the assets
			if (req.hostname === 'localhost' && req.headers.origin)
				res.setHeader(
					'Access-Control-Allow-Origin',
					req.headers.origin,
				);
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-shadow -- we’ve got devSever in scope
	setupMiddlewares: (middlewares, devServer) => {
		if (!devServer) {
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
				join(
					__dirname,
					'..',
					'..',
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
			middleware: webpackHotServerMiddleware(devServer.compiler, {
				chunkName: 'frontend.server',
			}),
		});

		return middlewares;
	},
};

export default { devServer };
