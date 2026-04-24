/**
 * Vite development server with SSR middleware.
 * Replaces webpack-dev-server + webpack-hot-server-middleware.
 *
 * Usage:
 *   NODE_ENV=development node --import tsx vite/dev-server.ts
 *
 * Or via makefile:
 *   make dev
 */

import { readFileSync } from 'node:fs';
import { createServer as createHttpServer } from 'node:http';
import { resolve } from 'node:path';
import express from 'express';
import { createServer as createViteServer, mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { cjsPackages } from './cjs-packages';
import { ssrCjsPlugin } from './ssr-cjs-plugin';
import { sharedConfig } from './vite.config.shared';

const port = 3030;
const root = process.cwd();

async function start() {
	const app = express();
	const httpServer = createHttpServer(app);

	// Create Vite server in middleware mode.
	// Handles client-side module transforms, HMR, and SSR module loading.
	const devConfig = mergeConfig(sharedConfig, {
		plugins: [
			svgr({
				include: '**/*.svg',
				svgrOptions: { svgo: false },
			}),
			ssrCjsPlugin([...cjsPackages]),
		],
		server: {
			middlewareMode: true,
			hmr: {
				server: httpServer,
			},
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
				'@guardian/libs',
				'@guardian/ophan-tracker-js',
				'@emotion/cache',
				'@emotion/react/jsx-dev-runtime',
				'@emotion/react',
				'react',
				'react-dom/client',
				'@guardian/identity-auth-frontend',
				'@guardian/commercial-core',
				'@guardian/source/foundations',
				'@guardian/core-web-vitals',
				'@guardian/ab-core',
				'@guardian/source/react-components',
				'swr',
				'swr/immutable',
				'@guardian/braze-components/logic',
				'lodash.debounce',
				'@guardian/commercial-core/geo/geo-utils',
				'@guardian/support-dotcom-components',
				'react-dom',
				'@guardian/braze-components/banner',
				'@braze/web-sdk',
				'@guardian/source-development-kitchen/react-components',
				'sanitize-html',
				'@guardian/braze-components/end-of-article',
				'react-google-recaptcha',
				'compare-versions',
				'@guardian/bridget/AbTesting',
				'@guardian/bridget/Acquisitions',
				'@guardian/bridget/Analytics',
				'@guardian/bridget/Audio',
				'@guardian/bridget/Commercial',
				'@guardian/bridget/Discussion',
				'@guardian/bridget/Environment',
				'@guardian/bridget/Gallery',
				'@guardian/bridget/Interaction',
				'@guardian/bridget/Interactives',
				'@guardian/bridget/ListenToArticle',
				'@guardian/bridget/Metrics',
				'@guardian/bridget/Navigation',
				'@guardian/bridget/Newsletters',
				'@guardian/bridget/Notifications',
				'@guardian/bridget/Tag',
				'@guardian/bridget/User',
				'@guardian/bridget/Videos',
				'@creditkarma/thrift-server-core',
				'is-mobile',
				'@guardian/bridget/SignInScreenReferrer',
				'valibot',
			],
		},
	});
	// SSR config must be set after mergeConfig to avoid being overwritten.
	devConfig.ssr = {
		// Bundle ESM-only packages that can't be require()'d by Node, plus
		// CJS packages that we want to expose via ESM named imports
		// (see cjs-packages.ts).
		noExternal: [/@guardian\//, 'screenfull', 'valibot', ...cjsPackages],
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

	httpServer.listen(port, () => {
		console.log(
			`\n  Vite DEV server running on http://localhost:${port}\n`,
		);
	});
}

start().catch((err) => {
	console.error('Failed to start dev server:', err);
	process.exit(1);
});
