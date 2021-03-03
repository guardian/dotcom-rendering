const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.@(tsx)'],
	addons: ['@storybook/addon-essentials'],
	webpackFinal: async (config) => {
		const rules = config.module.rules;
		const { extensions } = config.resolve;

		// Support typescript in Storybook
		// https://storybook.js.org/docs/configurations/typescript-config/
		rules.push({
			test: /\.[jt]sx?|mjs$/,
			exclude: [
				{
					test: /node_modules/,
					exclude: [
						/@guardian\/(?!(automat-modules))/,
						/dynamic-import-polyfill/,
					],
				},
			],
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

		return config;
	},
};
