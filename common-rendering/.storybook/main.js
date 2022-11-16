const path = require('path');
const webpack = require('webpack');

/** @type {import("@storybook/react/types").StorybookConfig} */
module.exports = {
	features: {
		// used in composition
		buildStoriesJson: true,
	},
	core: {
		builder: 'webpack5',
	},
	stories: ['../src/**/*.stories.@(tsx)'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-knobs'],
	webpackFinal: async (config) => {
		// Get project specific webpack options
		config = webpackConfig(config);

		// Global options for webpack
		config.resolve.extensions.push('.ts', '.tsx');

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
};

const webpackConfig = (config) => {
	const rules = config.module.rules;

	// Mock JSDOM for storybook - it relies on native node.js packages
	// Allows us to use enhancers in stories for better testing of components & full articles
	config.resolve.alias.jsdom$ = path.resolve(__dirname, './mocks/jsdom.js');

	// Support typescript in Storybook
	// https://storybook.js.org/docs/configurations/typescript-config/
	rules.push({
		test: /\.[jt]sx?|mjs$/,
		include: path.resolve(__dirname, '../'),
		exclude: {
			and: [/node_modules/],
			not: [
				// Include all @guardian modules, except automat-modules
				/@guardian\/(?!(automat-modules))/,

				// Include the dynamic-import-polyfill
				/dynamic-import-polyfill/,
			],
		},
		use: [
			{
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-react',
						[
							'@babel/preset-env',
							{
								bugfixes: true,
								targets: {
									esmodules: true,
								},
							},
						],
					],
				},
			},
			{
				loader: 'ts-loader',
				options: {
					configFile: 'tsconfig.json',
					transpileOnly: true,
				},
			},
		],
	});

	// modify storybook's file-loader rule to avoid conflicts with our svg
	// https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document
	const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
	fileLoaderRule.exclude = /\.svg$/;
	rules.push({
		test: /\.svg$/,
		use: ['desvg-loader/react', 'svg-loader'],
	});

	config.resolve.alias = {
		...config.resolve.alias,
	};

	return config;
};
