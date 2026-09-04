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
				alias: {
					Buffer: 'buffer',
					react: 'react',
					'react-dom': 'react-dom',
					// Mock JSDOM for storybook - it relies on native node.js packages
					jsdom$: path.resolve(__dirname, './mocks/jsdom.ts'),
					// log4js tries to call "fs" in storybook -- we can ignore it
					[`${path.resolve(
						__dirname,
						'../src/server/lib/logging',
					)}$`]: path.resolve(__dirname, './mocks/log4js.ts'),
					// Mock BridgetApi for storybook
					[`${path.resolve(__dirname, '../src/lib/bridgetApi')}$`]:
						path.resolve(__dirname, './mocks/bridgetApi.ts'),
					// Mock identity auth frontend to prevent Storybook components from hanging in Pending
					'@guardian/identity-auth-frontend': path.resolve(
						__dirname,
						'./mocks/identityAuthFrontend.ts',
					),
				},
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
