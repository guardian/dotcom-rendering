/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const { siteName, root } = require('./config');

function buildUrlFromQueryParam(req) {
	const DEFAULT_URL =
		'https://www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software';
	const url = new URL(req.query.url || DEFAULT_URL);
	// searchParams will only work for the first set of query params because 'url' is already a query param itself
	const searchparams = url.searchParams && url.searchParams.toString();
	// Reconstruct the parsed url adding .json?dcr which we need to force dcr to return json
	return `${url.origin}${url.pathname}.json?dcr=true&${searchparams}`;
}

function ampifyUrl(url) {
	// Take a url and make it work for AMP
	return url.replace('www', 'amp');
}

const go = () => {
	const webpackConfig = require('../webpack/frontend');
	const compiler = webpack(webpackConfig);

	const app = express();

	app.use(
		`/static/${siteName}`,
		express.static(path.join(root, 'src', 'static')),
	);

	app.use(
		webpackDevMiddleware(compiler, {
			serverSideRender: true,
			publicPath: '/assets/',
		}),
	);

	app.use(
		webpackHotMiddleware(
			compiler.compilers.find((config) => config.name === 'browser'),
			{
				// https://www.npmjs.com/package/friendly-errors-webpack-plugin#turn-off-errors
				log: () => {},
			},
		),
	);

	app.get(
		'/Article',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(req);
				const { html, ...config } = await fetch(url).then((article) =>
					article.json(),
				);

				req.body = config;
				next();
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		},
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
		}),
	);

	app.get(
		'/ArticleJson',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(req);
				const { html, ...config } = await fetch(url).then((article) =>
					article.json(),
				);

				req.body = config;
				next();
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		},
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
			serverRendererOptions: { json: true },
		}),
	);

	app.get(
		'/AMPArticle',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(req);
				const { html, ...config } = await fetch(
					ampifyUrl(url),
				).then((article) => article.json());
				req.body = config;
				next();
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		},
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
			serverRendererOptions: { amp: true },
		}),
	);

	app.get('/', (req, res) => {
		res.sendFile(
			path.join(root, 'scripts', 'frontend', 'landing', 'index.html'),
		);
	});

	app.get('*', (req, res) => {
		res.redirect('/');
	});

	app.use((err, req, res) => {
		res.status(500).send(err.stack);
	});

	const port = process.env.PORT || 3030;
	app.listen(port);
};

go();
