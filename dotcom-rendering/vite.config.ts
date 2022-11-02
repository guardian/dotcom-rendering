import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const jsxImportSource = '@emotion/react';
const exclude = /\.stories\.(t|j)sx?$/;

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export -- we goooood
export default defineConfig(({ command }) => ({
	esbuild: {
		jsxFactory: 'jsx',
		jsxImportSource,
	},
	plugins: [
		svgr(),
		legacy({ targets: ['defaults', 'not IE 11'] }),
		react({
			jsxImportSource,
			exclude,
		}),
	],
	logLevel: 'info',
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
	},
	ssr:
		command === 'build'
			? {
					noExternal: [
						// We need this for the prod build to actually work!
						/^@guardian/,
						/^@emotion/,
						/^@babel/,
						'log4js',
						'flatted',
						'react-is',
						'react-google-recaptcha',
						'hoist-non-react-statics',
						'react-async-script',
						'swr',
					],
			  }
			: undefined,
	build: {
		manifest: true,
		rollupOptions: {
			input: {
				sentryLoader: '/src/web/browser/sentryLoader/init.ts',
				bootCmp: '/src/web/browser/bootCmp/init.ts',
				ga: '/src/web/browser/ga/init.ts',
				ophan: '/src/web/browser/ophan/init.ts',
				islands: '/src/web/browser/islands/init.ts',
				dynamicImport: '/src/web/browser/dynamicImport/init.ts',
				atomIframe: '/src/web/browser/atomIframe/init.ts',
				embedIframe: '/src/web/browser/embedIframe/init.ts',
				newsletterEmbedIframe:
					'/src/web/browser/newsletterEmbedIframe/init.ts',
				relativeTime: '/src/web/browser/relativeTime/init.ts',
				initDiscussion: '/src/web/browser/initDiscussion/init.ts',
				debug: '/src/web/browser/debug/init.ts',
			},
		},
	},
}));
