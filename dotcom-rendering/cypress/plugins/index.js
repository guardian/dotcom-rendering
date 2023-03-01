// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import path from 'path';

const webpackPreprocessor = require('cypress-webpack-preprocessor-v5');

module.exports = (on, config) => {
	config.env = { ...config.env, ...process.env };

	const webpackConfig = webpackPreprocessor.defaultOptions;
	webpackConfig.webpackOptions.resolve = {
		extensions: ['.ts', '.js'],
	};
	const rules = webpackConfig.webpackOptions.module.rules;
	rules[0].exclude =
		require('../../scripts/webpack/webpack.config.browser').babelExclude;

	// Adding this here so that we can import the fixture in the sign-in-gate.cy.js file
	rules.push({
		test: path.resolve(
			__dirname,
			`../../fixtures/generated/articles/Standard.ts`,
		),
		exclude: ['/node_modules/'],
		loader: 'ts-loader',
		options: {
			compilerOptions: {
				noEmit: false,
			},
		},
	});
	on('file:preprocessor', webpackPreprocessor(webpackConfig));
	return config;
};
