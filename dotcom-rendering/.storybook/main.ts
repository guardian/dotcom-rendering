import { defineMain } from '@storybook/react-vite/node';
import path from 'node:path';
import process from 'node:process';
import { saveStories } from '../scripts/gen-stories/get-stories.mjs';
import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

// ESM equivalent of __dirname
const __dirname = import.meta.dirname;

// Generate dynamic Card and Layout stories
saveStories();

export default defineMain({
	features: {
		actions: true,
		backgrounds: true,
		controls: true,
		viewport: true,
	},

	stories: [
		'../src/**/*.stories.@(tsx)',
		'../stories/**/*.stories.@(tsx)',
		'../stories/**/*.stories.@(jsx)',
		'../src/**/*.mdx',
	],

	staticDirs: [
		'../src/static',
		{ from: '../src/static', to: '/static/frontend/' },
	],

	addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],

	viteFinal: async (config) => {
		config.plugins ??= [];
		config.plugins.push(
			svgr({
				svgrOptions: { svgo: false },
			}),
		);

		config.define ??= {};
		config.define['process.env'] = JSON.stringify({
			SDC_URL: process.env.SDC_URL,
			HOSTNAME: process.env.HOSTNAME,
		});

		config.resolve ??= {};
		config.resolve.alias = {
			...config.resolve.alias,

			Buffer: 'buffer',
			react: 'react',
			'react-dom': 'react-dom',

			// Mock JSDOM for storybook - it relies on native node.js packages
			jsdom$: path.resolve(__dirname, './mocks/jsdom.ts'),

			// log4js tries to call "fs" in storybook -- we can ignore it
			[`${path.resolve(__dirname, '../src/server/lib/logging')}$`]:
				path.resolve(__dirname, './mocks/log4js.ts'),

			// Mock BridgetApi for storybook
			[`${path.resolve(__dirname, '../src/lib/bridgetApi')}$`]:
				path.resolve(__dirname, './mocks/bridgetApi.ts'),

			// Mock identity auth frontend to prevent Storybook components from hanging in Pending
			'@guardian/identity-auth-frontend': path.resolve(
				__dirname,
				'./mocks/identityAuthFrontend.ts',
			),
		};

		return config;
	},

	env: (config) => ({
		...config,
		// Github sets a CI env var for all actions but this isn't being picked up by Storybook
		// See: https://storybook.js.org/docs/react/configure/environment-variables
		CI: 'true',
	}),
	core: {
		allowedHosts: ['storybook.thegulocal.com'],
	},

	framework: {
		name: '@storybook/react-vite',
		options: {},
	},

	typescript: {
		reactDocgen: 'react-docgen',
	},
});
