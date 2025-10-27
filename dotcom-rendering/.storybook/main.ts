import path from 'node:path';
import webpack from 'webpack';
import { transpileExclude, getLoaders } from '../webpack/webpack.config.client';
import { saveStories } from '../scripts/gen-stories/get-stories.mjs';
import type { StorybookConfig } from '@storybook/react-webpack5';
import { svgr } from '../webpack/svg.cjs';
import process from 'node:process';

// Generate dynamic Card and Layout stories
saveStories();

const config: StorybookConfig = {
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
		'@storybook/addon-backgrounds',
	],

	webpackFinal: async (config) => {
		// Get project specific webpack options
		config = webpackConfig(config);

		config.resolve ??= {};

		// Global options for webpack
		config.resolve.extensions?.push('.ts', '.tsx');

		config.resolve.fallback ??= {};
		// clean-css will try to import these packages
		config.resolve.fallback['http'] = false;
		config.resolve.fallback['https'] = false;
		config.resolve.fallback['os'] = false;

		// Required as otherwise 'process' will not be defined when included on its own (without .env)
		// e.g process?.env?.SOME_VAR
		config.plugins?.push(
			new webpack.DefinePlugin({
				'process.env': JSON.stringify({
					SDC_URL: process.env.SDC_URL,
					HOSTNAME: process.env.HOSTNAME ?? 'localhost',
				}),
			}),
			// We rely on Buffer for our bridget thrift client
			new webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer'],
			}),
		);
		return config;
	},

	env: (config) => ({
		...config,
		// Github sets a CI env var for all actions but this isn't being picked up by Storybook
		// See: https://storybook.js.org/docs/react/configure/environment-variables
		CI: 'true',
	}),

	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},

	typescript: {
		reactDocgen: 'react-docgen',
	},
};

/** the webpack.Configuration type from Storybook */
type Configuration = Parameters<
	NonNullable<StorybookConfig['webpackFinal']>
>[0];

const webpackConfig = (config: Configuration) => {
	const rules = config.module?.rules ?? [];

	config.resolve ??= {};
	config.resolve.alias ??= {};

	// Mock JSDOM for storybook - it relies on native node.js packages
	// Allows us to use enhancers in stories for better testing of components & full articles
	config.resolve.alias['jsdom$'] = path.resolve(
		__dirname,
		'./mocks/jsdom.ts',
	);

	// log4js tries to call "fs" in storybook -- we can ignore it
	config.resolve.alias[
		`${path.resolve(__dirname, '../src/server/lib/logging')}$`
	] = path.resolve(__dirname, './mocks/log4js.ts');

	// Mock BridgetApi for storybook
	config.resolve.alias[
		`${path.resolve(__dirname, '../src/lib/bridgetApi')}$`
	] = path.resolve(__dirname, './mocks/bridgetApi.ts');

	const webpackLoaders = getLoaders('client.web');

	// https://swc.rs/docs/usage/swc-loader#with-babel-loader
	if (webpackLoaders[0].loader.startsWith('swc')) {
		webpackLoaders[0].options.parseMap = true;
	}

	// Support typescript in Storybook
	// https://storybook.js.org/docs/configurations/typescript-config/
	rules.push({
		test: /\.[jt]sx?|mjs$/,
		include: [path.resolve(__dirname, '../')],
		exclude: transpileExclude,
		use: webpackLoaders,
	});

	// modify storybook's file-loader rule to avoid conflicts with our svg
	const fileLoaderRule = rules.find((rule) => {
		return String(rule?.test).includes('svg');
	});
	fileLoaderRule &&
		typeof fileLoaderRule !== 'string' &&
		(fileLoaderRule.exclude = /\.svg$/);
	rules.push(svgr);
	config.resolve.modules = [
		...((config && config.resolve && config.resolve.modules) || []),
	];
	config.resolve.alias = {
		...config.resolve.alias,
		Buffer: 'buffer',
		react: 'react',
		'react-dom': 'react-dom',
	};
	return config;
};

export default config;
