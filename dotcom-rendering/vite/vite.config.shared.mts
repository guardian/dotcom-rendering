import { createRequire } from 'node:module';
import type { UserConfig } from 'vite';

const DEV = process.env.NODE_ENV === 'development';
const nodeRequire = createRequire(import.meta.url);
const jsdomRequire = createRequire(nodeRequire.resolve('jsdom'));

/**
 * Shared Vite configuration applied to both server and client builds.
 */
export const sharedConfig: UserConfig = {
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
	},
	build: {
		sourcemap: DEV ? 'inline' : true,
	},
	resolve: {
		alias: {
			// Use css-tree's prebuilt bundle so its createRequire calls do not
			// become runtime dependencies in the standalone server bundle.
			'css-tree': jsdomRequire.resolve('css-tree/dist/csstree.esm'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
};
