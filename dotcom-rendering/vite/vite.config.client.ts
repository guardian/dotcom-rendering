import inject from '@rollup/plugin-inject';
import svgr from 'vite-plugin-svgr';
import type { UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import type { Build } from '../src/lib/assets';
import { getBrowserTargets } from './browser-targets';
import { sharedConfig } from './vite.config.shared';

const DEV = process.env.NODE_ENV === 'development';

/**
 * Maps each build variant to its entry point.
 */
const getEntryIndex = (build: Build): string => {
	switch (build) {
		case 'client.editionsCrossword':
			return './src/client/main.editionsCrossword.tsx';
		case 'client.apps':
			return './src/client/main.apps.ts';
		default:
			return './src/client/main.web.ts';
	}
};

/**
 * Returns esbuild-compatible browser targets for the given build.
 *
 * For web builds, we derive targets from @guardian/browserslist-config.
 * For apps/crossword, we use fixed mobile targets.
 */
const getBuildTarget = (build: Build): string[] => {
	switch (build) {
		case 'client.apps':
		case 'client.editionsCrossword':
			return ['chrome70', 'safari12'];
		default: {
			const targets = getBrowserTargets();
			// esbuild only supports: chrome, edge, firefox, safari, ios, node, es*
			// Filter out unsupported browsers like samsung, opera, etc.
			const supportedBrowsers = new Set([
				'chrome',
				'edge',
				'firefox',
				'safari',
				'ios',
				'node',
			]);
			return Object.entries(targets)
				.filter(([browser]) => supportedBrowsers.has(browser))
				.map(([browser, version]) => {
					const major = String(version).split('.')[0];
					return `${browser}${major}`;
				});
		}
	}
};

/**
 * Returns external modules for the given build.
 *
 * Apps: ophan is provided natively.
 * Crossword: ophan and commercial are provided externally.
 */
const getExternals = (build: Build): string[] => {
	if (build === 'client.apps') {
		return ['@guardian/ophan-tracker-js'];
	}
	if (build === 'client.editionsCrossword') {
		return ['@guardian/ophan-tracker-js', '@guardian/commercial'];
	}
	return [];
};

/**
 * Returns rollup output.globals for externalized modules.
 */
const getGlobals = (build: Build): Record<string, string> => {
	const globals: Record<string, string> = {};
	if (build === 'client.apps' || build === 'client.editionsCrossword') {
		globals['@guardian/ophan-tracker-js'] = 'guardian.ophan';
	}
	if (build === 'client.editionsCrossword') {
		globals['@guardian/commercial'] = 'guardian.commercial';
	}
	return globals;
};

/**
 * Generates manual chunk assignments for web builds.
 * Mirrors the webpack splitChunks.cacheGroups.frameworks config.
 */
const getManualChunks = (
	build: Build,
): ((id: string) => string | undefined) | undefined => {
	// Apps and crossword builds use inlineDynamicImports (single chunk)
	if (build === 'client.apps' || build === 'client.editionsCrossword') {
		return undefined;
	}

	return (id: string) => {
		if (
			/node_modules\/(preact|react-is|hoist-non-react-statistics|swr|@emotion|stylis)\//.test(
				id,
			)
		) {
			return 'frameworks';
		}
		return undefined;
	};
};

/**
 * Whether this build should inline all dynamic imports into a single chunk.
 * Apps and crossword builds produce a single file (no code splitting).
 */
const shouldInlineDynamicImports = (build: Build): boolean =>
	build === 'client.apps' || build === 'client.editionsCrossword';

/**
 * Creates a Vite client config for the given build variant.
 *
 * This replaces webpack.config.client.js — called once per build variant
 * (client.web, client.web.variant, client.apps, client.editionsCrossword).
 */
export const createClientConfig = (build: Build): UserConfig => {
	const isSingleChunk = shouldInlineDynamicImports(build);

	const clientConfig: UserConfig = {
		plugins: [
			svgr({
				svgrOptions: { svgo: false },
			}),
			// Buffer polyfill for apps/crossword builds
			// Replaces webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })
			...(isSingleChunk
				? [
						inject({
							Buffer: ['buffer', 'Buffer'],
						}),
				  ]
				: []),
		],
		resolve: {
			alias: {
				// Client builds use Preact for smaller bundle size.
				// Server builds use real React (not aliased).
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat',
			},
		},
		build: {
			outDir: 'dist',
			emptyOutDir: false,
			target: getBuildTarget(build),
			manifest: `manifest.${build}.json`,
			rollupOptions: {
				input: isSingleChunk
					? // Single-chunk builds can only have one entry
					  // (inlineDynamicImports is incompatible with multiple inputs)
					  { index: getEntryIndex(build) }
					: {
							index: getEntryIndex(build),
							debug: './src/client/debug/debug.ts',
					  },
				external: getExternals(build),
				output: {
					// Naming: [name].[build].[hash].js — matches webpack output pattern
					entryFileNames: (chunk) => {
						if (chunk.name === 'debug') return 'debug.js';
						return DEV
							? `[name].${build}.js`
							: `[name].${build}.[hash].js`;
					},
					chunkFileNames: DEV
						? `[name].${build}.js`
						: `[name].${build}.[hash].js`,
					globals: getGlobals(build),
					manualChunks: getManualChunks(build),
					...(isSingleChunk ? { inlineDynamicImports: true } : {}),
				},
			},
		},
	};

	return mergeConfig(sharedConfig, clientConfig);
};
