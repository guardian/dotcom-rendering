const path = require('path');
const webpack = require('webpack');

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../src/**/*.stories.@(tsx)'],
	addons: ['@storybook/addon-essentials'],
	webpackFinal: async (config) => {
		const rules = config.module.rules;
		const { extensions } = config.resolve;

		// Mock JSDOM for storybook - it relies on native node.js packages
		// Allows us to use enhancers in stories for better testing of compoenents & full articles
		config.resolve.alias.jsdom$ = path.resolve(
			__dirname,
			'./mocks/jsdom.js',
		);

		// Support typescript in Storybook
		// https://storybook.js.org/docs/configurations/typescript-config/
		rules.push({
			test: /\.[jt]sx?|mjs$/,
			exclude: require('../scripts/webpack/browser').babelExclude,
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
						configFile: 'tsconfig.build.json',
						transpileOnly: true,
					},
				},
			],
		});
		extensions.push('.ts', '.tsx');

		// modify storybook's file-loader rule to avoid conflicts with our svg
		// https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document
		const fileLoaderRule = rules.find((rule) => rule.test.test('.svg'));
		fileLoaderRule.exclude = /\.svg$/;
		rules.push({
			test: /\.svg$/,
			use: ['desvg-loader/react', 'svg-loader'],
		});

		// Add the @frontend and @root aliases to prevent imports using it from failing
		// Nb. __dirname is the current working directory, so .storybook in this case
		config.resolve.alias = {
			...config.resolve.alias,
			'@root': path.resolve(__dirname, '..'),
			'@frontend': path.resolve(__dirname, '../src'),
		};

		// Required as otherwise 'process' will not be defined when included on its own (without .env)
		// e.g process?.env?.SOME_VAR
		config.plugins.push(
			new webpack.DefinePlugin({
				process: '{}',
			}),
		);

		return config;
	},
};
