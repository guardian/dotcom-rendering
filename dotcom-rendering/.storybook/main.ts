import { defineMain } from '@storybook/react-vite/node';
import inject from '@rollup/plugin-inject';
import path from 'node:path';
import process from 'node:process';
import type { PluginOption } from 'vite';
import { saveStories } from '../scripts/gen-stories/get-stories.mjs';
import svgr from 'vite-plugin-svgr';

const __dirname = import.meta.dirname;

// Generate dynamic Card and Layout stories
saveStories();

export default defineMain({
	addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],

	core: {
		allowedHosts: ['storybook.thegulocal.com'],
	},

	env: (config) => ({
		...config,
		// Github sets a CI env var for all actions but this isn't being picked up by Storybook
		// See: https://storybook.js.org/docs/react/configure/environment-variables
		CI: 'true',
	}),

	framework: {
		name: '@storybook/react-vite',
		options: {},
	},

	features: {
		actions: true,
		backgrounds: true,
		controls: true,
		viewport: true,
	},

	staticDirs: [
		'../src/static',
		{ from: '../src/static', to: '/static/frontend/' },
	],

	stories: [
		'../src/**/*.stories.@(tsx)',
		'../stories/**/*.stories.@(jsx|tsx)',
		'../src/**/*.mdx',
	],

	typescript: {
		reactDocgen: 'react-docgen',
	},

	viteFinal: async (config) => {
		const { mergeConfig } = await import('vite');
		return mergeConfig(config, {
			define: {
				'process.env': JSON.stringify({
					SDC_URL: process.env.SDC_URL,
					HOSTNAME: process.env.HOSTNAME,
				}),
			},
			resolve: {
				alias: [
					// Mock imports that rely on node.js modules that are not available in the browser
					{ find: /^Buffer$/, replacement: 'buffer' },
					{ find: /^react$/, replacement: 'react' },
					{ find: /^react-dom$/, replacement: 'react-dom' },
					// Mock identity auth frontend to prevent components from hanging in pending
					{
						find: /^@guardian\/identity-auth-frontend$/,
						replacement: path.resolve(
							__dirname,
							'./mocks/identityAuthFrontend.ts',
						),
					},
					// Mock JSDOM - it relies on native node.js modules that are not available in the browser
					{
						find: /^jsdom$/,
						replacement: path.resolve(
							__dirname,
							'./mocks/jsdom.ts',
						),
					},
					// Mock custom code
					// Be careful with the find regexes
					// Mock logger as log4js as tries to call "fs"
					{
						find: /.*\/logging$/,
						replacement: path.resolve(
							__dirname,
							'./mocks/log4js.ts',
						),
					},
					// Mock BridgetApi
					{
						find: /.*bridgetApi$/,
						replacement: path.resolve(
							__dirname,
							'./mocks/bridgetApi.ts',
						),
					},
				],
			},
			// Add dependencies to pre-optimization
			optimizeDeps: {
				include: ['buffer'],
			},
			plugins: [
				// CJS to ESM shim for Buffer so Vite dev server can resolve it
				inject({
					Buffer: [
						path.resolve(__dirname, './shims/buffer.ts'),
						'Buffer',
					],
				}) as PluginOption,
				svgr({
					include: '**/*.svg',
					svgrOptions: { svgo: false },
				}),
			],
		});
	},
});
