/**
 * Vite development server with SSR middleware.
 * Replaces webpack-dev-server + webpack-hot-server-middleware.
 *
 * Usage:
 *   NODE_ENV=development node --import tsx vite/dev-server.ts
 *
 * Or via makefile:
 *   make vite-dev
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import express from 'express';
import { createServer as createViteServer, mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { sharedConfig } from './vite.config.shared';
import { ssrCjsPlugin } from './ssr-cjs-plugin';

const port = 3030;
const root = process.cwd();

async function start() {
	const app = express();

	// CJS packages in noExternal that need ESM wrapping for Vite 6's
	// SSR module runner. Only packages using require()/module.exports
	// that are matched by ssr.noExternal need to be listed here.
	const cjsPackages = ['@guardian/bridget'];

	// Create Vite server in middleware mode.
	// Handles client-side module transforms, HMR, and SSR module loading.
	const devConfig = mergeConfig(sharedConfig, {
		plugins: [
			svgr({
				include: '**/*.svg',
				svgrOptions: { svgo: false },
			}),
			ssrCjsPlugin(cjsPackages),
		],
		server: {
			middlewareMode: true,
			hmr: true,
		},
		appType: 'custom',
		// Serve client modules from /assets/ to match production asset paths
		base: '/assets/',
		// Pre-bundle CJS packages for client-side use (the ssrCjsPlugin
		// only wraps them for SSR; client needs Vite's built-in CJS→ESM).
		optimizeDeps: {
			include: [
				'@guardian/bridget',
				'@guardian/bridget/SignInScreenReason',
			],
		},
	});
	// SSR config must be set after mergeConfig to avoid being overwritten.
	devConfig.ssr = {
		// Bundle ESM-only packages that can't be require()'d by Node.
		noExternal: [/@guardian\//, 'screenfull', 'valibot'],
	};
	const vite = await createViteServer(devConfig);

	// Vite's connect middleware handles HMR websocket, module transforms,
	// and serves client-side files from /assets/
	app.use(vite.middlewares);

	// Parse JSON request bodies (used by POST routes for rendering)
	app.use(express.json({ limit: '10mb' }));

	// Serve static files (favicons, etc.)
	app.use('/static/frontend', express.static(resolve(root, 'src', 'static')));

	// Dev landing page with links to test content
	const devIndexHtml = readFileSync(
		resolve(root, 'src', 'server', 'dev-index.html'),
		'utf-8',
	);
	app.get('/', (_req, res) => {
		res.type('html').send(devIndexHtml);
	});

	// CORS: allow localhost cross-origin requests for dev
	app.use((req, res, next) => {
		const hostname = process.env.HOSTNAME ?? 'localhost';
		if (req.hostname === hostname && req.headers.origin) {
			res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		}
		next();
	});

	// SSR: load server module on each request via Vite's ssrLoadModule.
	// This re-evaluates the module when files change, providing instant
	// server-side hot reload without a full restart.
	app.use(async (req, res, next) => {
		try {
			const { devServer } = (await vite.ssrLoadModule(
				'./src/server/server.ts',
			)) as {
				devServer: () => express.Handler;
			};
			devServer()(req, res, next);
		} catch (e) {
			// Let Vite fix the stack trace for SSR errors
			if (e instanceof Error) {
				vite.ssrFixStacktrace(e);
			}
			next(e);
		}
	});

	app.listen(port, () => {
		console.log(
			`\n  Vite DEV server running on http://localhost:${port}\n`,
		);
	});
}

start().catch((err) => {
	console.error('Failed to start dev server:', err);
	process.exit(1);
});
