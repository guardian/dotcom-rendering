const chalk = require('chalk');

const port = 3030;

console.log(
	`${chalk.dim('DEV server running on')} ${chalk.blue.underline(
		`http://localhost:${port}`,
	)}`,
);

module.exports = {
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
