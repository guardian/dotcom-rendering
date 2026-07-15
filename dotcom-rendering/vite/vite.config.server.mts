import type { UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { cjsPackages } from './cjs-packages.mts';
import { ssrCjsPlugin } from './ssr-cjs-plugin.mts';
import { addVisualizerPlugins } from './visualizer.ts';
import { sharedConfig } from './vite.config.shared.mts';

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
		// Wrap CJS deps with ESM shims so `import { X } from 'pkg'` works
		// under Vite's SSR pipeline. Only fires for ids in `ssr.noExternal`.
		ssrCjsPlugin([...cjsPackages]),
		svgr({
			include: '**/*.svg',
			svgrOptions: { svgo: false },
		}),
		...(DEV ? [] : addVisualizerPlugins('server')),
	],
	build: {
		outDir: 'dist',
		emptyOutDir: false,
		ssr: true,
		target: `node${process.versions.node}`,
		minify: !DEV,
		sourcemap: true,
		rolldownOptions: {
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
		},
	},
	ssr: {
		// Bundle all node_modules by default to create a single server.js file with no external dependencies.
		noExternal: true,
		// Explicitly external in dev (not needed in prod where they're deployed)
		external: DEV ? ['@aws-sdk'] : [],
	},
} satisfies UserConfig);

// Default export for `vite build --config` CLI usage
// eslint-disable-next-line import/no-default-export -- required by Vite CLI
export default serverConfig;
