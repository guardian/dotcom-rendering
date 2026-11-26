import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import type { StorybookConfig } from '@storybook/react-webpack5';
import { defineMain } from '@storybook/react-webpack5/node';
import webpack from 'webpack';
import { saveStories } from '../scripts/gen-stories/get-stories.mjs';
import { svgr } from '../webpack/svg.cjs';
// Import CommonJS webpack config in ESM context
const require = createRequire(import.meta.url);
const {
	transpileExclude,
	getLoaders,
} = require('../webpack/webpack.config.client.js');

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

	addons: [
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
	],

	webpackFinal: async (config) => {
		// Get project specific webpack options
		const newConfig = webpackConfig(config);

		newConfig.resolve ??= {};

		// Global options for webpack
		newConfig.resolve.extensions?.push('.ts', '.tsx');

		newConfig.resolve.fallback ??= {};
		// clean-css will try to import these packages
		newConfig.resolve.fallback['http'] = false;
		newConfig.resolve.fallback['https'] = false;
		newConfig.resolve.fallback['os'] = false;

		// Required as otherwise 'process' will not be defined when included on its own (without .env)
		// e.g process?.env?.SOME_VAR
		newConfig.plugins?.push(
			new webpack.DefinePlugin({
				'process.env': JSON.stringify({
					SDC_URL: process.env.SDC_URL,
					HOSTNAME: process.env.HOSTNAME,
				}),
			}),
			// We rely on Buffer for our bridget thrift client
			new webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer'],
			}),
		);
		return newConfig;
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
		name: '@storybook/react-webpack5',
		options: {},
	},

	typescript: {
		reactDocgen: 'react-docgen',
	},
});

/** the webpack.Configuration type from Storybook */
type Configuration = Parameters<
	NonNullable<StorybookConfig['webpackFinal']>
>[0];

const webpackConfig = (config: Configuration) => {
	const rules = config.module?.rules ?? [];

	config.resolve ??= {};

	config.resolve.alias = {
		...config.resolve.alias,

		Buffer: 'buffer',
		react: 'react',
		'react-dom': 'react-dom',

		// Mock JSDOM for storybook - it relies on native node.js packages
		// Allows us to use enhancers in stories for better testing of components & full articles
		jsdom$: path.resolve(import.meta.dirname, './mocks/jsdom.ts'),

		// log4js tries to call "fs" in storybook -- we can ignore it
		[`${path.resolve(import.meta.dirname, '../src/server/lib/logging')}$`]:
			path.resolve(import.meta.dirname, './mocks/log4js.ts'),

		// Mock BridgetApi for storybook
		[`${path.resolve(import.meta.dirname, '../src/lib/bridgetApi')}$`]:
			path.resolve(import.meta.dirname, './mocks/bridgetApi.ts'),

		// Mock identity auth frontend to prevent Storybook components from hanging in Pending
		'@guardian/identity-auth-frontend': path.resolve(
			import.meta.dirname,
			'./mocks/identityAuthFrontend.ts',
		),
	};

	const webpackLoaders = getLoaders('client.web');

	// https://swc.rs/docs/usage/swc-loader#with-babel-loader
	if (webpackLoaders[0].loader.startsWith('swc')) {
		webpackLoaders[0].options.parseMap = true;
	}

	// Support typescript in Storybook
	// https://storybook.js.org/docs/configurations/typescript-config/
	rules.push({
		test: /\.[jt]sx?|mjs$/,
		include: [path.resolve(import.meta.dirname, '../')],
		exclude: transpileExclude,
		use: webpackLoaders,
	});

	// modify storybook's file-loader rule to avoid conflicts with our svg
	const fileLoaderRule = rules.find((rule) => {
		return String(rule?.test).includes('svg');
	});
	if (fileLoaderRule && typeof fileLoaderRule !== 'string') {
		fileLoaderRule.exclude = /\.svg$/;
	}
	rules.push(svgr);
	config.resolve.modules = [...(config.resolve.modules || [])];

	return config;
};
