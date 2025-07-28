import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// eslint-disable-next-line import/no-default-export -- vite expects a default export
export default defineConfig({
	root: 'src',
	server: {
		middlewareMode: true,
	},
	appType: 'custom',
	// build: {
	// 	emptyOutDir: true,
	// 	ssr: true,
	// 	outDir: './dist',
	// 	rollupOptions: {
	// 		input: {
	// 			main: './src/server/server.ts',
	// 			// Add other entry points if needed
	// 		},
	// 		output: {
	// 			format: 'cjs', // CommonJS format for Node.js compatibility
	// 			entryFileNames: '[name].js',
	// 			// chunkFileNames: '[name]-[hash].js',
	// 			// assetFileNames: '[name]-[hash][extname]',
	// 		},
	// 		external: [
	// 			'fsevents', // Exclude native module from bundle
	// 			/\.node$/, // Exclude all .node files
	// 		],
	// 		plugins: [
	// 			commonjs(),
	// 			// Add any Rollup plugins here if needed
	// 		],
	// 	},
	// },
	plugins: [
		react({
			jsxImportSource: '@emotion/react',
			parserConfig: { tsx: true },
		}),
		svgr(),
	],
	resolve: {
		alias: {
			fsevents: path.resolve(__dirname, './stub-empty.js'),
		},
	},
	optimizeDeps: {
		exclude: ['tsx'],
	},
});
