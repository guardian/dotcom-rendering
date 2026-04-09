import svgr from 'vite-plugin-svgr';
import type { UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import { sharedConfig } from './vite.config.shared';

const DEV = process.env.NODE_ENV === 'development';

/**
 * Vite SSR build configuration for the Express server bundle.
 * Replaces webpack.config.server.js.
 *
 * Key differences from client config:
 * - No Preact aliasing (server uses real React for renderToString)
 * - Outputs CommonJS for Node.js
 * - Most node_modules are external (not bundled)
 * - No minification in dev
 */
export const serverConfig: UserConfig = mergeConfig(sharedConfig, {
	plugins: [
		svgr({
			svgrOptions: { svgo: false },
		}),
	],
	build: {
		outDir: 'dist',
		emptyOutDir: false,
		ssr: true,
		target: `node${process.versions.node}`,
		minify: !DEV,
		sourcemap: true,
		rollupOptions: {
			input: {
				server: './src/server/server.ts',
			},
			output: {
				format: 'cjs',
				entryFileNames: '[name].js',
				// Produce a single server.js file (no code splitting),
				// matching webpack's single-file output. This avoids
				// server chunks colliding with client assets in dist/.
				inlineDynamicImports: true,
			},
			// webpack/bundles.js is CJS with module.exports — Rollup can't
			// resolve named exports from it. Externalize so it's required at runtime.
			external: [/webpack\/bundles/],
		},
	},
	ssr: {
		// Bundle these packages (they are ESM-only or need to be included).
		// Mirrors webpack-node-externals allowlist.
		noExternal: [
			// All @guardian scoped packages should be bundled
			/@guardian\//,
			// ESM-only package that throws when not bundled
			'screenfull',
			// Valibot is ESM and needs bundling
			'valibot',
		],
		// Explicitly external in dev (not needed in prod where they're deployed)
		external: DEV ? ['@aws-sdk'] : [],
	},
} satisfies UserConfig);

// Default export for `vite build --config` CLI usage
// eslint-disable-next-line import/no-default-export -- required by Vite CLI
export default serverConfig;
