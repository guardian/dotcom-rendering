// @ts-check

import fs from 'node:fs';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
// eslint-disable-next-line import/extensions -- it’s fine
import { getContentFromURLMiddleware } from './lib/get-content-from-url.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

const port = process.env.PORT ?? isProduction ? 9000 : 3030;

/** @type {Pick<import('vite').ViteDevServer, 'ssrLoadModule' | 'transformIndexHtml' | 'ssrFixStacktrace'>} */
const prodVite = {
	ssrLoadModule() {
		// @ts-expect-error -- it’s the way the cookie crumbles
		// eslint-disable-next-line import/extensions, import/no-unresolved -- This stuff is built in prod
		return import('../../dist/server/entry-server.mjs');
	},
	transformIndexHtml(_, template) {
		return Promise.resolve(template);
	},
	ssrFixStacktrace() {},
};

async function createServer() {
	const app = express();

	// Create Vite server in middleware mode and configure the app type as
	// 'custom', disabling Vite's own HTML serving logic so parent server
	// can take control
	const vite = isProduction
		? prodVite
		: await createViteServer({
				server: { middlewareMode: true },
				appType: 'custom',
		  });

	/** @type {typeof import("./entry-server")} */
	// @ts-expect-error -- this is Vite
	const { renderAmpHtml, renderArticleHtml, renderFrontHtml } =
		await vite.ssrLoadModule('/src/server/entry-server.ts');

	// use vite's connect instance as middleware
	// if you use your own express router (express.Router()), you should use router.use
	// @ts-expect-error -- it’s okay if it’s undefined
	if (!isProduction) app.use(vite.middlewares);

	app.use(getContentFromURLMiddleware);

	// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Express handles it fine
	app.get('/', async (req, res, next) => {
		const url = req.originalUrl;

		try {
			let template = fs.readFileSync(
				path.resolve(__dirname, 'index.html'),
				'utf-8',
			);

			template = await vite.transformIndexHtml(url, template);

			const html = template;

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			// If an error is caught, let Vite fix the stack trace so it maps back to
			// your actual source code.
			if (e instanceof Error) vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Express handles it fine
	app.get('/Article', async (req, res, next) => {
		const url = req.originalUrl;

		console.log('Serving Article for', url);

		try {
			const template = renderArticleHtml(req.body);

			const html = isProduction
				? template
				: await vite.transformIndexHtml(url, template);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			// If an error is caught, let Vite fix the stack trace so it maps back to
			// your actual source code.
			if (e instanceof Error) vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Express handles it fine
	app.get('/AMPArticle', async (req, res, next) => {
		const url = req.originalUrl;

		console.log('Serving AMP Article for', url);

		try {
			const html = renderAmpHtml(req.body);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			// If an error is caught, let Vite fix the stack trace so it maps back to
			// your actual source code.
			if (e instanceof Error) vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-misused-promises -- Express handles it fine
	app.get('/Front', async (req, res, next) => {
		const url = req.originalUrl;

		console.log('Serving Front for', url);

		try {
			const template = renderFrontHtml(req.body);

			const html = isProduction
				? template
				: await vite.transformIndexHtml(url, template);

			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			// If an error is caught, let Vite fix the stack trace so it maps back to
			// your actual source code.
			if (e instanceof Error) vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	const ARTICLE_URL = /\/\d{4}\/[a-z]{3}\/\d{2}\//;
	app.get(ARTICLE_URL, (req, res) => {
		const url = new URL(req.url, 'https://www.theguardian.com/').toString();
		console.info('redirecting to Article:', url);
		res.redirect(`/Article?url=${url}`);
	});

	const FRONT_URL = /^(\/[a-z-/]+)+(?!\.(js|ts))$/;
	app.get(FRONT_URL, (req, res, next) => {
		if (req.url === '/ws') return next();
		const url = new URL(req.url, 'https://www.theguardian.com/').toString();
		console.info('redirecting to Front:', url);
		res.redirect(`/Front?url=${url}`);
	});

	if (isProduction) {
		app.use(
			'/assets',
			express.static(resolve(__dirname, '../../dist/client')),
		);
	}

	app.listen(port);

	console.info(`Listening on http://localhost:${port}/`);
}

await createServer();
