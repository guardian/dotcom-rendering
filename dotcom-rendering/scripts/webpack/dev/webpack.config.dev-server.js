const chalk = require('chalk');

const DEV_SERVER_PORT = 3030;

console.log(
	`${chalk.dim('DEV server running on')} ${chalk.blue.underline(
		`http://localhost:${DEV_SERVER_PORT}`,
	)}`,
);

module.exports = {
	devServer: {
		compress: false,
		hot: false,
		port: DEV_SERVER_PORT,
		liveReload: true,
		setupMiddlewares: require('./setup-middlewares'),
		client: {
			logging: 'warn',
			overlay: true,
		},
		devMiddleware: {
			publicPath: '/assets/',
			writeToDisk: true,
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
