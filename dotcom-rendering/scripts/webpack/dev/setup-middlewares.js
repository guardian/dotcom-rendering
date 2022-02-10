const path = require('path');
const express = require('express');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const bodyParser = require('body-parser');
const {
	getContentFromURLMiddleware,
} = require('../../../src/server/lib/get-content-from-url');

module.exports = (middlewares, devServer) => {
	if (!devServer) {
		throw new Error('webpack-dev-server is not defined');
	}

	// it turns out webpack dev server is just an express server
	// with webpack-dev-middleware, so here we add some other middlewares
	// of our own

	devServer.app.use(
		'/static/frontend',
		express.static(path.join(__dirname, '..', '..', '..', 'src', 'static')),
	);

	devServer.app.use(bodyParser.json({ limit: '10mb' }));

	// populates req.body with the content data from a production
	// URL if req.params.url is present
	devServer.app.use(getContentFromURLMiddleware);

	devServer.app.get('/', (req, res) => {
		res.sendFile(
			path.join(
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
};
