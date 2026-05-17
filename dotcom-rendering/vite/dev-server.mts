/**
 * Vite development server with SSR middleware.
 *
 * Usage:
 *   NODE_ENV=development node --import tsx vite/dev-server.ts
 *
 * Or via makefile:
 *   make dev
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import express from 'express';
import type { Plugin } from 'vite';
import { createServer as createViteServer, mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { cjsPackages } from './cjs-packages.mts';
import { ssrCjsPlugin } from './ssr-cjs-plugin.mts';
import { sharedConfig } from './vite.config.shared.mts';

/**
 * Plugin that triggers a browser full-reload when SSR-only modules change.
 * Vite's SSR environment invalidates its module graph on file changes but
 * doesn't notify the browser. This invokes a reload via Vite's HMR websocket API.
 */
function ssrReloadPlugin(): Plugin {
	return {
		name: 'ssr-full-reload',
		hotUpdate({ modules, server }) {
			if (this.environment.name === 'ssr' && modules.length > 0) {
				server.hot.send({ type: 'full-reload' });
			}
		},
	};
}

const port = 3030;
const root = process.cwd();

async function start() {
	const app = express();

	// Create Vite server in middleware mode
	// Handles client-side module transforms, HMR and SSR module loading
	const devConfig = mergeConfig(sharedConfig, {
		plugins: [
			svgr({
				include: '**/*.svg',
				svgrOptions: { svgo: false },
			}),
			ssrCjsPlugin([...cjsPackages]),
			ssrReloadPlugin(),
		],
		server: {
			middlewareMode: true,
			hmr: true,
		},
		appType: 'custom',
		// Serve client modules from /assets/
		base: '/assets/',
		// Optimize dependencies for faster dev server startup and HMR updates
		optimizeDeps: {
			include: [
				'@braze/web-sdk',
				'@creditkarma/thrift-server-core',
				'@emotion/cache',
				'@emotion/react',
				'@emotion/react/jsx-runtime',
				'@emotion/react/jsx-dev-runtime',
				'@guardian/ab-core',
				'@guardian/braze-components/banner',
				'@guardian/braze-components/end-of-article',
				'@guardian/braze-components/logic',
				'@guardian/bridget',
				'@guardian/bridget/AbTesting',
				'@guardian/bridget/AdSlot',
				'@guardian/bridget/Acquisitions',
				'@guardian/bridget/Analytics',
				'@guardian/bridget/Audio',
				'@guardian/bridget/Commercial',
				'@guardian/bridget/Discussion',
				'@guardian/bridget/Environment',
				'@guardian/bridget/Gallery',
				'@guardian/bridget/Image',
				'@guardian/bridget/Interaction',
				'@guardian/bridget/Interactives',
				'@guardian/bridget/ListenToArticle',
				'@guardian/bridget/Metrics',
				'@guardian/bridget/Navigation',
				'@guardian/bridget/Newsletters',
				'@guardian/bridget/Notifications',
				'@guardian/bridget/SignInScreenReason',
				'@guardian/bridget/SignInScreenReferrer',
				'@guardian/bridget/Tag',
				'@guardian/bridget/Topic',
				'@guardian/bridget/User',
				'@guardian/bridget/Videos',
				'@guardian/commercial-core',
				'@guardian/commercial-core/geo/geo-utils',
				'@guardian/core-web-vitals',
				'@guardian/identity-auth-frontend',
				'@guardian/libs',
				'@guardian/ophan-tracker-js',
				'@guardian/source-development-kitchen/react-components',
				'@guardian/source/foundations',
				'@guardian/source/react-components',
				'@guardian/support-dotcom-components',
				'compare-versions',
				'is-mobile',
				'lodash.debounce',
				'react',
				'react-dom',
				'react-dom/client',
				'react-google-recaptcha',
				'sanitize-html',
				'screenfull',
				'swr',
				'swr/immutable',
				'valibot',
			],
		},
		ssr: {
			noExternal: [
				/@guardian\//,
				'screenfull',
				'valibot',
				...cjsPackages,
			],
		},
	});

	// Create Vite dev server instance
	const vite = await createViteServer(devConfig);

	// Vite's connect middleware handles HMR websocket, module transforms
	// and serves files from /assets/
	app.use(vite.middlewares);

	// Parse JSON request bodies
	app.use(express.json({ limit: '10mb' }));

	// Serve static files
	app.use('/static/frontend', express.static(resolve(root, 'src', 'static')));

	// Dev index page
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

	// SSR: reload server module graph on each request via Vite's ssrLoadModule
	app.use(async (req, res, next) => {
		try {
			const { devServer } = (await vite.ssrLoadModule(
				'./src/server/server.ts',
			)) as {
				devServer: () => express.RequestHandler;
			};

			return devServer()(req, res, next);
		} catch (e) {
			// Let Vite fix the stack trace for SSR errors
			if (e instanceof Error) {
				vite.ssrFixStacktrace(e);
			}
			return next(e);
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
