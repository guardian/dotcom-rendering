import type { UserConfig } from 'vite';

const DEV = process.env.NODE_ENV === 'development';

/**
 * Shared Vite configuration applied to both server and client builds.
 * Replaces the `commonConfigs()` function from webpack.config.js.
 */
export const sharedConfig: UserConfig = {
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		'process.env.HOSTNAME': JSON.stringify(process.env.HOSTNAME),
	},
	build: {
		sourcemap: DEV ? 'inline' : true,
		// Rolldown is used automatically when available in Vite 7+
		// For Vite 6 with experimental Rolldown, uncomment:
		// rollupOptions: { experimentalRolldown: true },
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
};
