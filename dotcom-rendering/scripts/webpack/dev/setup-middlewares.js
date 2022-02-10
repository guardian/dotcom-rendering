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

	devServer.app.use(
		'/static/frontend',
		express.static(path.join(__dirname, '..', '..', '..', 'src', 'static')),
	);

	devServer.app.use(bodyParser.json({ limit: '10mb' }));

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

	// webpackHotServerMiddleware needs to run after  webpack-devserver-middleware
	middlewares.push({
		name: 'server',
		middleware: webpackHotServerMiddleware(devServer.compiler, {
			chunkName: 'frontend.server',
		}),
	});

	return middlewares;
};
