const path = require("path");
const webpack = require("webpack");

module.exports = {
	core: {
		builder: "webpack5",
	},
	stories: [
		"../apps-rendering/src/**/*.stories.@(js|mdx|ts|tsx)",
		// "../dotcom-rendering/src/**/*.stories.@(tsx)",
		"../common-rendering/src/**/*.stories.@(tsx)",
	],
	addons: [
		"@storybook/addon-essentials",
		"storybook-addon-turbo-build",
		"@storybook/addon-knobs",
		{
			name: "storybook-addon-turbo-build",
			options: {
				optimizationLevel: 1,
			},
		},
	],
	webpackFinal: async (config) => {
		// Get project specific webpack options
		config = dcrWebpack(config);
		config = arWebpack(config);

		// Global options for webpack
		config.resolve.extensions.push(".ts", ".tsx");

		// Required as otherwise 'process' will not be defined when included on its own (without .env)
		// e.g process?.env?.SOME_VAR
		config.plugins.push(
			new webpack.DefinePlugin({
				process: "{}",
			})
		);

		return config;
	},
};

const dcrWebpack = (config) => {
	const rules = config.module.rules;

	// Mock JSDOM for storybook - it relies on native node.js packages
	// Allows us to use enhancers in stories for better testing of compoenents & full articles
	config.resolve.alias.jsdom$ = path.resolve(__dirname, "./mocks/jsdom.js");

	// Support typescript in Storybook
	// https://storybook.js.org/docs/configurations/typescript-config/
	rules.push({
		test: /\.[jt]sx?|mjs$/,
		include: path.resolve(__dirname, "../dotcom-rendering"),
		exclude: require("../dotcom-rendering/scripts/webpack/browser")
			.babelExclude,
		use: [
			{
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-react",
						[
							"@babel/preset-env",
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
				loader: "ts-loader",
				options: {
					configFile: "dotcom-rendering/tsconfig.build.json",
					transpileOnly: true,
				},
			},
		],
	});

	// modify storybook's file-loader rule to avoid conflicts with our svg
	// https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document
	const fileLoaderRule = rules.find((rule) => rule.test.test(".svg"));
	fileLoaderRule.exclude = /\.svg$/;
	rules.push({
		test: /\.svg$/,
		use: ["desvg-loader/react", "svg-loader"],
	});

	config.resolve.alias = {
		...config.resolve.alias,
		"@root": path.resolve(__dirname, "../dotcom-rendering"),
		"@frontend": path.resolve(__dirname, "../dotcom-rendering/src"),
	};

	return config;
};

const arWebpack = (config) => {
	const rules = config.module.rules;

	rules.push({
		test: /\.tsx?$/,
		include: [
			path.resolve(__dirname, "../apps-rendering"),
			path.resolve(__dirname, "../common-rendering"),
		],
		use: [
			{
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								// Babel recommends installing corejs as a peer dependency
								// and specifying the version used here
								// https://babeljs.io/docs/en/babel-preset-env#usebuiltins
								// This should automatically inject polyfills as needed,
								// based on our code and the browserslist in package.json
								useBuiltIns: "usage",
								corejs: 3,
								modules: false,
								targets: { esmodules: true },
							},
						],
					],
				},
			},
			{
				loader: "ts-loader",
				options: {
					configFile: "apps-rendering/config/tsconfig.client.json",
				},
			},
		],
	});

	config.resolve.modules = [
		...(config?.resolve?.modules || []),
		path.resolve(__dirname, "../apps-rendering/src"),
		path.resolve(__dirname, "../common-rendering/src"),
	];

	config.resolve.alias = {
		...config.resolve.alias,
		logger: path.resolve(
			__dirname,
			`../apps-rendering/src/logger/clientDev`
		),
		Buffer: "buffer",
	};

	return config;
};
