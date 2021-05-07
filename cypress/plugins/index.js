// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const webpackPreprocessor = require('cypress-webpack-preprocessor-v5');

module.exports = (on, config) => {
	config.env = { ...config.env, ...process.env };

	const webpackConfig = {
		// override default webpack config
		// https://github.com/cypress-io/cypress/tree/master/npm/webpack-preprocessor#webpackoptions
		webpackOptions: {
			mode: 'development',
			module: {
				rules: [
					{
						test: /\.[jt]sx?|mjs$/,
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
									presets: ['@babel/preset-env'],
								},
							},
						],
					},
				],
			},
		},
		watchOptions: {},
	};

	on('file:preprocessor', webpackPreprocessor(webpackConfig));
	return config;
};
