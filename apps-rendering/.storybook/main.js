const path = require('path');
const webpack = require('webpack');

/** @type {import("@storybook/react/types").StorybookConfig} */
module.exports = {
	stories: ['../src/**/*.stories.@(js|mdx|ts|tsx)'],

	addons: ['@storybook/addon-webpack5-compiler-babel'],

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

		// Required as otherwise 'process' will not be defined when included on its own (without .env)
		// e.g process?.env?.SOME_VAR
		config.plugins.push(
			new webpack.DefinePlugin({
				process: '{}',
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

	docs: {},
};

const webpackConfig = (config) => {
	const rules = config.module.rules;

	rules.push({
		test: /\.tsx?$/,
		include: [path.resolve(__dirname, '..')],
		use: [
			{
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								// Babel recommends installing corejs as a peer dependency
								// and specifying the version used here
								// https://babeljs.io/docs/en/babel-preset-env#usebuiltins
								// This should automatically inject polyfills as needed,
								// based on our code and the browserslist in package.json
								useBuiltIns: 'usage',
								corejs: 3,
								modules: false,
								targets: { esmodules: true },
							},
						],
					],
				},
			},
			{
				loader: 'ts-loader',
				options: {
					configFile: 'config/tsconfig.client.json',
				},
			},
		],
	});

	config.resolve.modules = [
		...((config && config.resolve && config.resolve.modules) || []),
		path.resolve(__dirname, '../src'),
	];

	config.resolve.alias = {
		...config.resolve.alias,
		logger: path.resolve(__dirname, `../src/logger/clientDev`),
		Buffer: 'buffer',
	};

	return config;
};
