import path from 'path';
import chalk from 'chalk';

import type { Configuration } from 'webpack-dev-server';

const port = 3030;

console.log(
	`${chalk.dim('DEV server running on')} ${chalk.blue.underline(
		`http://localhost:${port}`,
	)}`,
);

const config: { devServer: Configuration } = {
	devServer: {
		compress: false,
		hot: false,
		port,
		liveReload: true,
		setupMiddlewares: require('./setup-middlewares'),
		client: {
			logging: 'warn',
			overlay: true,
		},
		static: {
			directory: path.join(__dirname, '..', '..', '..', 'src', 'static'),
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
	},
};

export default config;
