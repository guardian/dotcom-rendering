const path = require('path');
const webpack = require('webpack');

// Generate dynamic Card and Layout stories
require('../dotcom-rendering/scripts/gen-stories/gen-stories');

/** @type {import("@storybook/react/types").StorybookConfig} */
module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: [
		'../apps-rendering/src/**/*.stories.@(js|mdx|ts|tsx)',
		'../dotcom-rendering/src/**/*.stories.@(tsx)',
		'../dotcom-rendering/stories/**/*.stories.@(tsx)',
		'../common-rendering/src/**/*.stories.@(tsx)',
	],
	addons: [
		'@storybook/addon-essentials',
		'storybook-addon-turbo-build',
		'@storybook/addon-knobs',
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
		config = dcrWebpack(config);
		config = arWebpack(config);

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

const dcrWebpack = (config) => {
	const rules = config.module.rules;

	// Mock JSDOM for storybook - it relies on native node.js packages
	// Allows us to use enhancers in stories for better testing of components & full articles
	config.resolve.alias.jsdom$ = path.resolve(__dirname, './mocks/jsdom.js');

	// log4js tries to call "fs" in storybook -- we can ignore it
	config.resolve.alias[
		path.resolve(__dirname, '../dotcom-rendering/src/server/lib/logging.ts')
	] = path.resolve(__dirname, './mocks/log4js.js');

	// SecureSignup uses @emotion/cache and @emotion/server - can't be used in storybook
	config.resolve.alias[
		path.resolve(
			__dirname,
			'../dotcom-rendering/src/web/components/Newsletters/SecureSignup.tsx',
		)
	] = path.resolve(
		__dirname,
		'../dotcom-rendering/__mocks__/SecureSignupMock.tsx',
	);

	// Support typescript in Storybook
	// https://storybook.js.org/docs/configurations/typescript-config/
	rules.push({
		test: /\.[jt]sx?|mjs$/,
		include: path.resolve(__dirname, '../dotcom-rendering'),
		exclude:
			require('../dotcom-rendering/scripts/webpack/webpack.config.browser')
				.babelExclude,
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
					configFile: 'dotcom-rendering/tsconfig.build.json',
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

const arWebpack = (config) => {
	const rules = config.module.rules;

	rules.push({
		test: /\.tsx?$/,
		include: [
			path.resolve(__dirname, '../apps-rendering'),
			path.resolve(__dirname, '../common-rendering'),
		],
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
					configFile: 'apps-rendering/config/tsconfig.client.json',
				},
			},
		],
	});

	config.resolve.modules = [
		...((config && config.resolve && config.resolve.modules) || []),
		path.resolve(__dirname, '../apps-rendering/src'),
		path.resolve(__dirname, '../common-rendering/src'),
	];

	config.resolve.alias = {
		...config.resolve.alias,
		logger: path.resolve(
			__dirname,
			`../apps-rendering/src/logger/clientDev`,
		),
		Buffer: 'buffer',
	};

	return config;
};
