const path = require('path');
const webpack = require('webpack');
const {
	babelExclude,
	getLoaders,
} = require('../scripts/webpack/webpack.config.client');

// Generate dynamic Card and Layout stories
require('../scripts/gen-stories/gen-stories');

/** @type {import("@storybook/react-webpack5").StorybookConfig} */
module.exports = {
	features: {
		// used in composition
		buildStoriesJson: true,
	},
	stories: [
		'../src/**/*.stories.@(tsx)',
		'../stories/**/*.stories.@(tsx)',
		'../stories/**/*.stories.@(jsx)',
	],
	staticDirs: ['../src/static'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-controls',
		'storybook-addon-turbo-build',
		{
			name: 'storybook-addon-turbo-build',
			options: {
				optimizationLevel: 1,
				// We're explicitly setting the minification options below because
				// we want to turn off `minifyIdentifiers`. Why? Because it breaks
				// Islands hydration. When you minify the component filenames
				// the dynamic imports fail to find them.
				// See: https://github.com/privatenumber/esbuild-loader#minify
				//    & https://esbuild.github.io/api/#minify
				esbuildMinifyOptions: {
					target: 'es2015',
					minify: false,
					minifyWhitespace: true,
					minifyIdentifiers: false,
					minifySyntax: true,
				},
			},
		},
	],
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
		options: { fastRefresh: true },
	},
	docs: {
		autodocs: true,
	},
};
const webpackConfig = (config) => {
	const rules = config.module.rules;

	// Mock JSDOM for storybook - it relies on native node.js packages
	// Allows us to use enhancers in stories for better testing of components & full articles
	config.resolve.alias.jsdom$ = path.resolve(__dirname, './mocks/jsdom.js');

	// log4js tries to call "fs" in storybook -- we can ignore it
	config.resolve.alias[
		path.resolve(__dirname, '../src/server/lib/logging.ts')
	] = path.resolve(__dirname, './mocks/log4js.js');

	// SecureSignup uses @emotion/cache and @emotion/server - can't be used in storybook
	config.resolve.alias[
		path.resolve(__dirname, '../src/components/SecureSignup.tsx')
	] = path.resolve(__dirname, '../__mocks__/SecureSignupMock.tsx');
	const webpackLoaders = getLoaders('web');
	// https://swc.rs/docs/usage/swc-loader#with-babel-loader
	if (webpackLoaders[0].loader.startsWith('swc')) {
		webpackLoaders[0].options.parseMap = true;
	}

	// Support typescript in Storybook
	// https://storybook.js.org/docs/configurations/typescript-config/
	rules.push({
		test: /\.[jt]sx?|mjs$/,
		include: [path.resolve(__dirname, '../')],
		exclude: babelExclude,
		use: webpackLoaders,
	});

	// modify storybook's file-loader rule to avoid conflicts with our svg
	// https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document
	const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
	fileLoaderRule.exclude = /\.svg$/;
	rules.push({
		test: /\.svg$/,
		use: ['desvg-loader/react', 'svg-loader'],
	});
	config.resolve.modules = [
		...((config && config.resolve && config.resolve.modules) || []),
	];
	config.resolve.alias = {
		...config.resolve.alias,
		Buffer: 'buffer',
	};
	return config;
};
