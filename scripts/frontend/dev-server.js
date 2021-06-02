/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const bodyParser = require('body-parser');

const { siteName, root } = require('./config');

const defaultArticleURL =
	'https://www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software';

const defaultInteractiveURL =
	'https://www.theguardian.com/environment/ng-interactive/2021/feb/23/beneath-the-blue-dive-into-a-dazzling-ocean-under-threat-interactive';

const defaultAmpInteractiveURL =
	'https://www.theguardian.com/world/2021/mar/24/how-a-container-ship-blocked-the-suez-canal-visual-guide';

function buildUrlFromQueryParam(req, defaultURL) {
	const url = new URL(req.query.url || defaultURL);
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
	app.use(bodyParser.json({ limit: '10mb' }));

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
				const url = buildUrlFromQueryParam(req, defaultArticleURL);
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
			serverRendererOptions: { path: '/Article' },
		}),
	);

	app.post(
		'/Article',
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
			serverRendererOptions: { path: '/Article' },
		}),
	);

	app.get(
		'/ArticleJson',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(req, defaultArticleURL);
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
			serverRendererOptions: { path: '/ArticleJson' },
		}),
	);

	app.get(
		'/AMPArticle',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(req, defaultArticleURL);
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
			serverRendererOptions: { path: '/AMPArticle' },
		}),
	);

	app.post(
		'/AMPArticle',
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
			serverRendererOptions: { path: '/AMPArticle' },
		}),
	);

	app.get(
		'/Interactive',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(req, defaultInteractiveURL);
				const { html, ...config } = await fetch(
					url,
				).then((interactive) => interactive.json());

				req.body = config;
				next();
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		},
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
			serverRendererOptions: { path: '/Interactive' },
		}),
	);

	app.get(
		'/AMPInteractive',
		async (req, res, next) => {
			try {
				const url = buildUrlFromQueryParam(
					req,
					defaultAmpInteractiveURL,
				);
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
			serverRendererOptions: { path: '/AMPInteractive' },
		}),
	);

	app.post(
		'/AMPInteractive',
		webpackHotServerMiddleware(compiler, {
			chunkName: `${siteName}.server`,
			serverRendererOptions: { path: '/AMPInteractive' },
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
