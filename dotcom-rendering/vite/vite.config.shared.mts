import type { UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

const DEV = process.env.NODE_ENV === 'development';

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
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		DEV
			? undefined
			: visualizer({
					emitFile: true,
					filename: 'a1stats.html',
					template: 'treemap',
			  }),
	],
};
